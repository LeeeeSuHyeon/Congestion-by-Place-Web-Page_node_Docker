// 201935312 이수현 lib/auth.js
var db = require('./db');
var sanitizeHtml = require('sanitize-html');
var session = require('express-session')
var url = require('url');

module.exports = {
    login : (req, res)=>{
        var context = {
            menu : "menuForCustomer",
            body : 'login',
        };
        res.json(context)
    }, // end of login

    login_process : (req, res)=>{
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
            if (results[0].num === 1){
                db.query('select name, licence from businessperson where loginid = ? and password = ?', [sanitizedId, sanitizedPwd], (err, result)=>{
                    console.log('result : ', result)
                    req.session.is_logined = true;
                    req.session.name = result[0].name
                    req.session.licence = result[0].licence
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
                req.session.is_logined = false;
                req.session.name = '손님';
                req.session.class = '000';
                var context = {
                    success : false,
                    message : 'ID or password is incorrect.'
                }
                res.json(context);
                
                // 로그인에 실패하면 알림창 띄우고 다시 로그인 페이지로 이동 
                // res.end(`<script type='text/javascript'>alert("ID or password is incorrect."); location.href = 'http://192.168.64.8:3000/auth/login'; </script>`)
            }
        })
    }, // end of login_process

    logout_process: (req, res) => {
        req.session.destroy((err) => {
            if (err) {
                console.error('Error destroying session:', err);
                res.status(500).json({ success: false, message: 'Internal server error' });
            } else {
                res.json({ success: true, message: 'Logout successful' });
            }
        });
    }, // end of logout_process

    register : (req, res) =>{
        var context = {
            menu : "menuForCustomer",
            body : 'register',
        };
        res.json(context)
    }, // end of register 

    register_process: (req, res) => {
        var post = req.body;

        db.query('insert into businessperson (loginid,  password, name, address, tel, birth, licence ) value(?,?,?,?,?,?,?)',
            [post.loginid, post.password, post.name, post.address, post.tel, post.birth, post.licence], (err, result) => {
                if (err) {
                    console.log(err);
                    res.status(500).json({ success: false, message: 'Internal server error' });
                } else {
                    // 회원가입 완료되면 알림 띄우기
                    res.json({ success: true, message: 'Registration is complete! Please log in' });
                }
            });
    } // end of register_process
}