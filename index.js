const express = require("express");
const app = express();
app.set('views', __dirname +'/views');
app.set('view engine', 'ejs');

// 포트 번호를 환경 변수로 설정하고, 기본값은 7070로 지정
const port = process.env.PORT || 7070;


// body-parser 모듈 
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));


// 사용자 정의 모듈 
var rootRouter = require('./router/rootRouter');

// 라우팅 
app.use('/', rootRouter);


//정적 파일 폴더 지정
app.use(express.static('public'));


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
