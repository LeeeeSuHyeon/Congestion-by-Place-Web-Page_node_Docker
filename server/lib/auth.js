// 201935312 이수현 lib/auth.js
var db = require('./db');
var sanitizeHtml = require('sanitize-html');
var session = require('express-session')

module.exports = {
    login : (req, res)=>{
        var context = {
            menu : "menuForCustomer.ejs",
            // who : '손님',
            body : 'login.ejs',
            // logined : 'NO'
        };
        req.app.render('home', context, (err, html)=>{
            res.end(html);
        })
    }, // end of login

    login_process : (req, res)=>{
        var post = req.body;

        // 스크립트 태그가 입력으로 들어올 수 있으므로 자동 삭제해주는 sanitizie 모듈 사용 
        sanitizedId = sanitizeHtml(post.id)
        sanitizedPwd = sanitizeHtml(post.pwd)

        // businessperson 테이블의 loginid와 password가 일치하는지 확인 
        db.query('select count(*) as num from businessperson where loginid = ? and password = ?', [sanitizedId, sanitizedPwd], (err, results)=>{

            if (results[0].num === 1){
                db.query('select name, licence from businessperson where loginid = ? and password = ?', [sanitizedId, sanitizedPwd], (err, result)=>{
                    req.session.is_logined = true;
                    req.session.name = result[0].name
                    req.session.licence = result[0].licence
                    res.redirect('/');
                })
            }
            else{
                req.session.is_logined = false;
                req.session.name = '손님';
                req.session.class = '000';
                // res.redirect('/');
                
                // 로그인에 실패하면 알림창 띄우고 다시 로그인 페이지로 이동 
                res.end(`<script type='text/javascript'>alert("ID or password is incorrect."); location.href = '/auth/login'; </script>`)
            }
        })
    }, // end of login_process

    logout_process : (req, res)=>{
        req.session.destroy((err)=>{
            res.redirect('/');
        })
    }, // end of logout_process

    register : (req, res) =>{
        var context = {
            menu : "menuForCustomer.ejs",
            body : 'register.ejs',
            // logined : 'NO'
        };
        req.app.render('home', context, (err, html)=>{
            res.end(html);
        })
    }, // end of register 

    register_process : (req, res) =>{
        var post = req.body

        db.query('insert into businessperson (loginid,  password, name, address, tel, birth, licence ) value(?,?,?,?,?,?,?)',
        [post.loginid, post.password, post.name, post.address, post.tel, post.birth, post.licence], (err, result)=>{
            if(err){console.log(err)}
            else{

                // 회원가입 완료되면 알림 띄우기
                res.end(`<script type='text/javascript'>alert("Registration is complete! Please log in")
                <!--
                  setTimeout("location.href='http://192.168.64.8:7080/auth/login'", 1000);
                //-->
                  </script>`)
            }
        })

    }// end of register_process 
}