// 201935312 이수현 lib/auth.js
var db = require('./db');
var sanitizeHtml = require('sanitize-html');
var session = require('express-session')


// 미들웨어 함수 정의
const saveSession = (req, res, next) => {
    if (req.session.is_logined) {
      res.locals.is_logined = req.session.is_logined;
      res.locals.name = req.session.name;
      res.locals.licence = req.session.licence;
    }
    console.log('Session after:', req.session);
    next();
};


module.exports = {

    // 로그인 화면 반환 로직
    login : (req, res)=>{
        var context = {
            menu : "menuForCustomer",
            body : 'login',
        };
        res.json(context)
    }, // end of login

    // 로그인 프로세스 로직
    login_process : (req, res)=>{

        // 프론트에서 보낸 데이터를 받음
        var post = req.body;

        console.log('req : ', req)
        console.log('req.body : ', req.body)

        // 스크립트 태그가 입력으로 들어올 수 있으므로 자동 삭제해주는 sanitizie 모듈 사용 
        sanitizedId = sanitizeHtml(post.id)
        sanitizedPwd = sanitizeHtml(post.pwd)

        console.log(`sanitizedPwd: ${sanitizedId}, sanitizedPwd: ${sanitizedPwd}`);
        // businessperson 테이블의 loginid와 password가 일치하는지 확인 
        db.query('select count(*) as num from businessperson where loginid = ? and password = ?', [sanitizedId, sanitizedPwd], (err, results)=>{

            console.log('results : ', results)

            // DB에 loginid, pw가 일치하는 응답 있다면 실행
            if (results[0].num === 1){
                // 일치하는 회원의 이름과, 사업자 번호를 DB에 요청
                db.query('select name, licence from businessperson where loginid = ? and password = ?', [sanitizedId, sanitizedPwd], (err, result)=>{
                    console.log('result : ', result)

                    // 서버에서 사용자가 로그인했는지 확인하기 위해 세션 등록 
                    req.session.is_logined = true;
                    req.session.name = result[0].name
                    req.session.licence = result[0].licence

                    console.log('Session after:', req.session);

                    // 로그인이 완료되면 화면 이동 후 shop의 데이터를 출력하기 위해, 모든 shop 정보를 가져옴
                    db.query("select * from shop", (err, results) => {
                        var context = {
                            success : true,
                            menu: 'menuForMember',
                            body: 'shop',
                            shops: results,
                            name: req.session.name,
                            licence: req.session.licence,
                            update: 'NO'
                        };
                        
                        res.json(context);
                    });
                })
            }
            else{

                // 로그인 정보가 일치하지 않으면, json 객체로 화면에 띄울 메세지를 함께 보냄 
                req.session.is_logined = false;
                req.session.name = '손님';
                req.session.class = '000';
                var context = {
                    success : false,
                    message : 'ID or password is incorrect.'
                }
                res.json(context);
                
            }
        })
    }, // end of login_process

    // 로그아웃 프로세스 
    logout_process: (req, res) => {

        // 서버의 세션 초기화
        req.session.destroy((err) => {
            if (err) {
                console.error('Error destroying session:', err);
                res.status(500).json({ success: false, message: 'Internal server error' });
            } else {
                // 성공적으로 세션이 초기화됐다면, 프론트에 success 응답 
                res.json({ success: true, message: 'Logout successful' });
            }
        });
    }, // end of logout_process

    // 회원등록 페이지 응답 
    register : (req, res) =>{
        var context = {
            menu : "menuForCustomer",
            body : 'register',
        };
        res.json(context)
    }, // end of register 

    // 회원등록 프로세스 로직 
    register_process: (req, res) => {
        // 프론트에서 데이터를 받아옴
        var post = req.body;

        // DB의 회원 테이블에 프론트에서 받아온 데이터를 등록 
        db.query('insert into businessperson (loginid,  password, name, address, tel, birth, licence ) value(?,?,?,?,?,?,?)',
            [post.loginid, post.password, post.name, post.address, post.tel, post.birth, post.licence], (err, result) => {
                if (err) {
                    console.log(err);
                    res.status(500).json({ success: false, message: 'Internal server error' });
                } else {
                    // 회원가입 완료되면 알림 띄우기 위한 json 응답
                    res.json({ success: true, message: 'Registration is complete! Please log in' });
                }
            });
    }, // end of register_process

    saveSession,
}