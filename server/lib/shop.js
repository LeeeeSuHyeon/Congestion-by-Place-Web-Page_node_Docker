// 201935312 이수현 shop.js

var db = require('./db');

// 사용자의 로그인 유무를 확인해주는 함수 (세션 사용)
function authIsOwner(req, res){
    if(req.session.is_logined){return true}
    else{return false}
}


module.exports = {

    // '/shop/view/:vu/:licence'로 요청된 주소에 대한 응답
    // 로그인 한 사용자가 등록한 자신의 가게 정보를 응답해줌 
    view : (req,res)=>{
        var vu = req.params.vu                  // vu: view, update로 구분 
        var licence = req.params.licence        // DB 조회를 위해 url에 사용자의 licence를 표시
        var isOwner = authIsOwner(req, res);    // 로그인 유무 확인

        console.log('session? : ', req.session)
        console.log('licence? : ', licence)
        console.log('vu? : ', vu)
        // v를 요청했을 경우 
        if (vu === "v"){
            // 로그인한 유저
            if(isOwner){
                // 사용자의 라이센스 번호로 DB에 licence가 일치하는 값 요청 
                db.query("select * from shop where businessperson_licence = ?",[licence], (err, results)=>{
                    // update를 NO로 응답 
                    var context = {
                        success : true,
                        menu : "menuForMember",
                        name : req.session.name,
                        licence : req.session.licence,
                        body : 'shop',
                        shops : results || [], 
                        update : 'NO'
                    };
                    res.json(context)
                })
            }
            // 로그인하지 않고 직접적인 url을 통해 요청한 경우 
            else{
                var context ={
                    success : false,
                    message : 'Login Please',
                }
                res.json(context)
            }
        }
        // update를 요청한 경우 
        else if(vu === "u"){
            if(isOwner){
                // 사용자의 라이센스 번호로 DB에 licence가 일치하는 값 요청 
                db.query("select * from shop where businessperson_licence = ?",[licence], (err, results)=>{
                    // update를 YES로 응답 
                    var context = {
                        success : true,
                        menu : "menuForMember",
                        body : 'shop',
                        shops : results || [], 
                        name : req.session.name,
                        licence : req.session.licence,
                        update : 'YES'
                    };
                    res.json(context)
                })
            }
        }
    },  // end of view

    // '/shop/customerView/:LC/:lc' url이 요청한 응답 
    // 비로그인 사용자가 메뉴바에 따라 카테고리 별, 지역 별 구분 된 shop의 정보를 응답해줌
    customerView : (req, res)=>{
        // select 옵션의 value 값을, 배열 내 딕셔너리 key값으로 사용하여 DB에 저장된 정보로 바꿈
        var location = [{1:"교내"},{2:"태평동"},{3:"복정동"}]
        var category = [{1:"음식점"},{2:"카페"},{3:"헬스장"}]

        var LC = req.params.LC;     // location인지, category인지 구분 
        var lc = req.params.lc;     // select 옵션에서 value값을 구분 

        // :LC를 통해 location인지, category인지 구분하고 LC에 따라 사용할 배열을 정하고, 위 배열에서 키값을 통해 값을 가져옴 
        lc = (LC === "location") ? String(location.find(item => item[lc])[lc]) : String(category.find(item => item[lc])[lc])
        console.log(LC, lc)
        
        // location 을 요청한 경우 
        if(LC === "location"){
            // DB에서 lc 값과 location이 일치하는 shop의 정보를 받아옴 
            db.query('select * from shop where location = ?', [lc], (err, results)=>{
                if(err){console.log(err)}
                console.log(results)
                var context= {
                    success : true,
                    menu : "menuForCustomer",
                    body : 'shop',
                    shops : results,
                    update : 'NO'
                }
                res.json(context)
            })
        }
        // category를 요청한 경우 
        else{
            // DB에서 lc 값과 category와 일치하는 shop의 정보를 받아옴 
            db.query('select * from shop where category = ?', [lc], (err, results)=>{
                if(err){console.log(err)}
                console.log(results)
                var context= {
                    success : true,
                    menu : "menuForCustomer",
                    body : 'shop',
                    shops : results,
                    update : 'NO'
                }
                res.json(context)
            })
        }
    },

    // '/shop/create' url에 대한 응답 
    // 로그인 한 사용자가 자신의 가게를 추가하는 페이지 정보 응답 
    create : (req, res) =>{
        var isOwner = authIsOwner(req, res);
        if(isOwner){
            var context = {
                success : true,
                menu: "menuForMember",
                name : req.session.name,
                licence : req.session.licence,
                body: 'shopCU',         // shopCU를 body로 응답 
                shop: null,
            }
            res.json(context)
        }
    },

    // create 프로세스 로직 (라우터에서 file 값을 만들어서 보내줌)
    create_process : (req, res, file) =>{
        var post = req.body;                    // 프론트의 form 값을 post로 받아옴 
        var isOwner = authIsOwner(req, res);    // 사용자의 로그인 유무 확인 

        // form으로 받은 is_open은 체크 박스 이기 때문에 boolean 값으로 바꿔줌 
        post.is_open = (post.is_open === 'on') ? true : false
        if(isOwner){

            // form 데이터 입력 시 이미지 파일을 선택하지 않았을 경우 
            if(file === 'No'){ 
                // DB insert 시에 file 값은 넣지 않음 
                db.query('insert into shop (location, category, name, total_user, user, start_time, end_time, is_open, address, businessperson_licence) value(?,?,?,?,?,?,?,?,?,?)'
                    ,[post.location, post.category, post.name, post.total_user, post.user, post.start_time, post.end_time, post.is_open, post.address, req.session.licence],(err, result)=>{
                    if(err){console.log(err)}
                    else{
                        res.writeHead(302, {Location: `192.168.64.8:3000/shop/view/v/${req.session.licence}`});
                        res.end();
                    }
                    }
                )
            }
            // form 데이터 입력 시 이미지 파일을 선택한 경우
            else{
                // DB insert 시에 file 값도 넣어줌 
                db.query('insert into shop (location, category, name, total_user, user, start_time, end_time, is_open, address, image, businessperson_licence) value(?,?,?,?,?,?,?,?,?,?,?)'
                    ,[post.location, post.category, post.name, post.total_user, post.user, post.start_time, post.end_time, post.is_open, post.address, file, req.session.licence],(err, result)=>{
                    if(err){console.log(err)}
                    else{
                        res.writeHead(302, {Location: `192.168.64.8:3000/shop/view/v/${req.session.licence}`});
                        res.end();
                    }
                    }
                )
            }
                
        }
    },

    // '/shop/update/:shopId' url에 대한 응답 
    update : (req, res)=>{
        var id = req.params.shopId;             // 업데이트 할 shop의 기본키인 shop_id 값을 시멘틱 Url로 받아옴
        var isOwner = authIsOwner(req, res);    // 사용자의 로그인 유무 확인 
        if(isOwner){
            // DB에서 shop_id 값이 시멘틱 Url로 받은 값과 일치하는 shop 정보를 받아와서 응답
            db.query('select * from shop where shop_id = ?',[id], (err, result)=>{

                var context = {
                    success : true,
                    menu: "menuForMember",
                    name : req.session.name,
                    licence : req.session.licence,
                    body: 'shopCU',
                    shop: result[0],
                }
                res.json(context)
            })
        }
    },

    // 업데이트 프로세스
    // 사용자가 form으로 응답한 post 값을 이용하여 DB 테이블 업데이트 
    update_process : (req, res, file) =>{
        var post = req.body;
        var isOwner = authIsOwner(req, res);

        // is_open(영업 중인지?) - 체크 박스를 확인해서 영업 중이 아니면, 현재인원을 0명으로 변경
        post.user = (post.is_open !== 'on') ? 0 : post.user

        // is_open은 체크 박스이기 때문에, boolean 값으로 변경 
        post.is_open = (post.is_open === 'on') ? true : false
        if(isOwner){
            // create와 마찬가지로 이미지 file 변경 유무에 따라 다른 DB 쿼리문 사용 
            if(file === 'No'){
                db.query('update shop set location = ?, category = ?, name = ?, total_user = ?, user =?, start_time = ?, end_time = ?, is_open = ?, address = ?  where shop_id = ?',
                [post.location, post.category, post.name, post.total_user, post.user, post.start_time, post.end_time, post.is_open, post.address, post.shop_id], (err, results)=>{
                    if(err){console.log(err)}
                    else{
                        res.writeHead(302, {Location: `192.168.64.8:3000/shop/view/u/${req.session.licence}`});
                        res.end();
                    }
                   
                })
            }
            else {
                db.query('update shop set location = ?, category = ?, name = ?, total_user = ?, user =?, start_time = ?, end_time = ?, is_open = ?, address = ?, image = ? where shop_id = ?',
                [post.location, post.category, post.name, post.total_user, post.user, post.start_time, post.end_time, post.is_open, post.address, file, post.shop_id], (err, results)=>{
                    if(err){console.log(err)}
                    else{
                        res.writeHead(302, {Location: `192.168.64.8:3000/shop/view/u/${req.session.licence}`});
                        res.end();
                    }
                   
                })
            }
        }
    },


    // 'shop/delete/:shopId' url에 대한 응답 
    // shop 삭제 프로세스
    delete_process : (req, res) =>{
        id = req.params.shopId ;

        // DB에서 시멘틱 Url로 받은 shop_id 값과 일치하는 데이터 삭제
        db.query('DELETE FROM shop WHERE shop_id = ?', [id], (error, result) => { 
            if(error) { throw error; }
            else{
                res.writeHead(302, {Location: `192.168.64.8:3000/shop/view/u/${req.session.licence}`});
                res.end();
            }
        });
    }
}