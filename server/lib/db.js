// 201935312 이수현 lib/db.js

// mysql의 코드가 필요 - DB 접속을 위해 
var mysql = require('mysql');

// DB 연결 설정 
var db = mysql.createConnection({
    // host : '172.18.0.2',    // MySQL 호스트 주소로 컨테이너의 IP 주소
    // MySQL 컨테이너가 재시작할 때 호스트 주소가 변경되므로, Docker Compose의 네트워크를 활용
    // 도커 컴포즈에서 서비스 간 통신을 위해 사용하는 네트워크는 컨테이너의 이름으로도 접근 가능
    host : 'mysql_project', 
    user : 'project-db',    // DB 컨테이너의 유저 아이디
    password : '1234',      // DB 컨테이너의 유저 패스워드
    database : 'project-db' // DB 컨테이너 사용 데이터 베이스 
})

// 데이터 베이스 연결 
db.connect();

// 모듈 내보내기
module.exports = db;    