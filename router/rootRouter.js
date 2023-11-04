// 201935312 이수현 router/rootRouter.js

const express = require('express');
var router = express.Router()

var root = require('../lib/root');

router.get("/", (req, res) => {
    root.home(req, res);
});
  

module.exports = router;