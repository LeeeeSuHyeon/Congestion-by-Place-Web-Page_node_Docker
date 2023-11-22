// 201935312 이수현 lib/root.js

var db = require('./db');   

// 사용자의 로그인 유무를 확인해주는 함수 (세션 사용)
function authIsOwner(req, res){
    if(req.session.is_logined){return true}
    else{return false}
}


module.exports = {

    // '/' 로 요청된 페이지 응답 작성 
    home: (req, res) => {

        // 로그인 유무 확인 
        var isOwner = authIsOwner(req, res);
        
        // 로그인에 따라 네비게이션 바가 다름 -> 삼항 연산자 사용 
        var menuType = isOwner ? 'menuForMember' : 'menuForCustomer';

        // 메뉴바, body, 모든 가게 정보, 세션에 저장된 사용자 이름, 사업자 번호, 업데이트 유무 응답 
        db.query("select * from shop", (err, results) => {
            var context = {
                menu: menuType,
                body: 'shop',
                shops: results,
                name: req.session.name,
                licence: req.session.licence,
                update: 'NO'
            };
            res.json(context);
        });
    }
};
