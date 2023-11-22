// 201935312 이수현 router/shopRouter.js

const express = require('express');
var router = express.Router()

// lib 폴더의 shop.js로 req, res 값을 넘겨주기 위함 
// Ex) '/shop/view/:vu/:licence' 으로 요청된 경우, shop.js의 view 로 req, res 보냄
var shop = require('../lib/shop');


// 파일 upload를 위해 multer 사용 
const multer = require('multer');

const upload = multer({
    storage: multer.diskStorage({
              destination: function (req, file, cb) { cb(null, 'public/images');  },
              filename: function (req, file, cb) {
                      var newFileName = file.originalname
                      cb(null, newFileName); }
             }),
    });

// 로그인 한 사용자의 자신 가게의 view, update를 위한 요청 
router.get('/view/:vu/:licence',(req, res)=>{
    shop.view(req, res);
}); 

// 시멘틱 url을 이용하여 (LC : category, location), (lc : 세부 장소 또는 세부 카테고리)
// 로그인 하지 않은 사용자가 원하는 shop을 보기 위한 요청
router.get('/customerView/:LC/:lc',(req, res)=>{
    shop.customerView(req, res);
}); 

// 로그인 한 사용자가 자신의 가게를 추가하는 요청 
router.get('/create',(req,res)=>{
    shop.create(req,res);
})

// 가게 추가 프로세스
// 파일의 주소를 받아와서 '/images/' 를 추가하여 public 폴더의 images 폴더로 위치 설정 
// DB의 shop 테이블에 해당 이미지 파일 위치를 저장하기 때문 
router.post('/create_process',upload.single('uploadFile'),(req,res)=>{
    
    var file = '/images/' + req.file.filename
    shop.create_process(req,res,file);
})

// shopId에 해당하는 가게의 정보를 수정하는 요청 
router.get('/update/:shopId',(req,res)=>{
    shop.update(req,res);
})

// 가게 업데이트 프로세스
// file을 수정하지 않으면 file 을 no로 주어, 업데이트 하지 않게 설정 
// 수정했으면, create와 마찬가지로 주소 변경 
router.post('/update_process',upload.single('uploadFile'),(req,res)=>{
    var file = ''
    if(req.file === undefined) {file = 'No'}
    else file = '/images/' + req.file.filename
    console.log(file)
    shop.update_process(req,res,file);
})

// Shop_id 가게 삭제 프로세스 
router.get('/delete/:shopId',(req,res)=>{
    shop.delete_process(req,res);
})

module.exports = router;

