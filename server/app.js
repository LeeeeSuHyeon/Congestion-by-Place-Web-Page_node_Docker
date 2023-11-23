const express = require("express");
const app = express();
const cors = require('cors');

// CORS 설정 - Cross-Origin Resource Sharing 문제 해결을 위함 
app.use(cors({ origin: true, credentials: true }));


// 포트 번호를 환경 변수로 설정하고, 기본값은 7080로 지정
const port = process.env.PORT || 7080;

// session 관련 모듈, 세션 DB 저장 모듈 
var session = require('express-session'); 
var MySqlStore = require('express-mysql-session')(session); // db에 저장하기 위한 세션 

var options = {
    // host : '172.18.0.2',    // MySQL 호스트 주소로 컨테이너의 IP 주소
    // MySQL 컨테이너가 재시작할 때 호스트 주소가 변경되므로, Docker Compose의 네트워크를 활용
    // 도커 컴포즈에서 서비스 간 통신을 위해 사용하는 네트워크는 컨테이너의 이름으로도 접근 가능
    host : 'mysql_project', 
    user : 'project-db',
    password : '1234',
    database : 'project-db'
};

// DB에 세션 저장 
var sessionStore = new MySqlStore(options);
   
app.use(session({
   secret : 'keyboard cat',
   resave : false,
   saveUninitialized : true,
   store : sessionStore
}));


// body-parser 모듈 
var bodyParser = require('body-parser');
app.use(bodyParser.json());


// 사용자 정의 모듈 
var rootRouter = require('./router/rootRouter');
var authRouter = require('./router/authRouter');
var shopRouter = require('./router/shopRouter');

var auth = require('./lib/auth');

// 미들웨어를 사용
app.use(auth.saveSession);

// 라우팅 - router 폴더의 Router들에게 url을 분류해서 전달함 
app.use('/', rootRouter);
app.use('/auth', authRouter)
app.use('/shop', shopRouter)


//정적 파일 폴더 지정 (shop의 image 저장)
app.use(express.static('public'));

// 서버 연결 
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});