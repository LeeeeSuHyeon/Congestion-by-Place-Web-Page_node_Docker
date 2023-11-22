// 201935312 이수현 router/rootRouter.js

const express = require('express');
var router = express.Router()

// lib 폴더의 root.js로 req, res 값을 넘겨주기 위함 
var root = require('../lib/root');

// 메인 화면 페이지 요청 
router.get("/", (req, res) => {
    root.home(req, res);
});
  

module.exports = router;