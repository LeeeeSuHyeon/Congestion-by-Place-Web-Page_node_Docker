// 201935312 이수현 router/authRouter.js

const express = require('express');
var router = express.Router()

// lib 폴더의 auth.js로 req, res 값을 넘겨주기 위함 
// Ex) '/auth/login' 으로 요청된 경우, auth.js의 login 으로 req, res 보냄
var auth = require('../lib/auth');

// 로그인 페이지 요청
router.get('/login', (req, res)=>{
    auth.login(req, res)
});

// 로그인 프로세스
router.post('/login_process', (req, res)=>{
    auth.login_process(req, res)
});

// 로그아웃 프로세스 
router.get('/logout_process', (req, res)=>{
    auth.logout_process(req, res)
});

// 회원가입 페이지 응답
router.get('/register', (req, res)=>{
    auth.register(req, res)
});

// 회원가입 프로세스 
router.post('/register_process', (req, res)=>{
    auth.register_process(req, res)
});


module.exports = router;