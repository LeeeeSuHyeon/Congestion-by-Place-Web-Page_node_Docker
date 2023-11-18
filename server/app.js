const express = require("express");
const app = express();
app.set('views', __dirname +'/views');
app.set('view engine', 'ejs');

// 포트 번호를 환경 변수로 설정하고, 기본값은 7080로 지정
const port = process.env.PORT || 7080;

// session 관련 모듈, 세션 DB 저장 모듈 
var session = require('express-session'); 
var MySqlStore = require('express-mysql-session')(session); // db에 저장하기 위한 세션 

var options = {
   host : '172.18.0.2', // MySQL 호스트 주소로 컨테이너를 실행하는 호스트 머신의 IP 주소를 사용
   user : 'project-db',
   password : '1234',
   database : 'project-db'
   };

var sessionStore = new MySqlStore(options);
   
app.use(session({
   secret : 'keyboard cat',
   resave : false,
   saveUninitialized : true,
   store : sessionStore
}));


// body-parser 모듈 
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));


// 사용자 정의 모듈 
var rootRouter = require('./router/rootRouter');
var authRouter = require('./router/authRouter');
var shopRouter = require('./router/shopRouter');

// 라우팅 
app.use('/', rootRouter);
app.use('/auth', authRouter)
app.use('/shop', shopRouter)


//정적 파일 폴더 지정
app.use(express.static('public'));


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
