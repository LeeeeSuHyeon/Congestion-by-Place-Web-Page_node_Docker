// 201935312 이수현 router/shop.js

const express = require('express');
var router = express.Router()

var shop = require('../lib/shop');


// 파일 upload
const multer = require('multer');

const upload = multer({
    storage: multer.diskStorage({
              destination: function (req, file, cb) { cb(null, 'public/images');  },
              filename: function (req, file, cb) {
                      //var newFileName = new Date().valueOf() + path.extname(file.originalname)
                      var newFileName = file.originalname
                      cb(null, newFileName); }
             }),
    });

router.get('/view/:vu/:licence',(req, res)=>{
    shop.view(req, res);
}); 

router.get('/create',(req,res)=>{
    shop.create(req,res);
})

router.post('/create_process',upload.single('uploadFile'),(req,res)=>{
    var file = '/images/' + req.file.filename
    shop.create_process(req,res,file);
})

router.get('/update/:shopId',(req,res)=>{
    shop.update(req,res);
})
router.post('/update_process',upload.single('uploadFile'),(req,res)=>{
    var file = ''
    if(req.file === undefined) {file = 'No'}
    else file = '/images/' + req.file.filename
    console.log(file)
    shop.update_process(req,res,file);
})

router.get('/delete/:merId',(req,res)=>{
    shop.delete_process(req,res);
})

module.exports = router;

