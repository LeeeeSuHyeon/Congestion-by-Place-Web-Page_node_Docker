// 201935312 이수현 lib/db.js

// mysql의 코드가 필요 - DB 접속을 위해 
var mysql = require('mysql');

// DB 연결 설정 
var db = mysql.createConnection({
    host : '172.18.0.2',    // MySQL 호스트 주소로 컨테이너를 실행하는 호스트 머신의 IP 주소를 사용
    user : 'project-db',
    password : '1234',
    database : 'project-db'
})

// 데이터 베이스 연결 
db.connect();

module.exports = db;    // 모듈 내보내기