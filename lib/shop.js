// 201935312 이수현 shop.js

var db = require('./db');

function authIsOwner(req, res){
    if(req.session.is_logined){return true}
    else{return false}
}


module.exports = {
    view : (req,res)=>{
        var vu = req.params.vu
        var licence = req.params.licence

        if (vu === "v"){
            var isOwner = authIsOwner(req, res);
            if(isOwner){
                db.query("select * from shop where businessperson_licence = ?",[licence], (err, results)=>{
                    var context = {
                        menu : "menuForMember.ejs",
                        // who : req.session.name,
                        body : 'shop.ejs',
                        // logined : req.session.is_logined ? 'YES' : 'NO',
                        shops : results || [], 
                        name : req.session.name,
                        licence : req.session.licence,
                        update : 'NO'
                    };
                    req.app.render('home', context, (err, html)=>{
                        res.end(html);
                    })
                })
            }
            else{
                res.end(`<script type='text/javascript'>alert("Login Please."); location.href = '/auth/login'; </script>`)
            }
        }
        else if(vu === "u"){
            var isOwner = authIsOwner(req, res);
            if(isOwner){
                db.query("select * from shop", (err, results)=>{
                    var context = {
                        menu : "menuForMember.ejs",
                        who : req.session.name,
                        body : 'shop.ejs',
                        // logined : req.session.is_logined ? 'YES' : 'NO',
                        shop : results,
                        name : req.session.name,
                        licence : req.session.licence,
                        update : 'YES'
                    };
        
                    req.app.render('home', context, (err, html)=>{
                        res.end(html);
                    })
    
                })
            }
        }
    },

    create : (req, res) =>{
        var isOwner = authIsOwner(req, res);
        if(isOwner){
            var context = {
                menu: "menuForMember.ejs",
                name : req.session.name,
                licence : req.session.licence,
                body: 'shopCU.ejs',
                shop: null,
            }
            req.app.render('home', context, (err, html)=>{
                res.end(html);
            })
        }
    },

    create_process : (req, res, file) =>{
        var post = req.body;
        var isOwner = authIsOwner(req, res);
        post.is_open = (post.is_open === 'on') ? true : false
        if(isOwner){
            if(file === 'No'){ 
                db.query('insert into shop (location, category, name, total_user, user, start_time, end_time, is_open, address, businessperson_licence) value(?,?,?,?,?,?,?,?,?,?)'
                    ,[post.location, post.category, post.name, post.total_user, post.user, post.start_time, post.end_time, post.is_open, post.address, req.session.licence],(err, result)=>{
                    if(err){console.log(err)}
                    else{
                        res.writeHead(302, {Location: `/shop/view/v/${req.session.licence}`});
                        res.end();
                    }
                    }
                )
            }

            else{
                db.query('insert into shop (location, category, name, total_user, user, start_time, end_time, is_open, address, image, businessperson_licence) value(?,?,?,?,?,?,?,?,?,?,?)'
                    ,[post.location, post.category, post.name, post.total_user, post.user, post.start_time, post.end_time, post.is_open, post.address, file, req.session.licence],(err, result)=>{
                    if(err){console.log(err)}
                    else{
                        res.writeHead(302, {Location: `/shop/view/v/${req.session.licence}`});
                        res.end();
                    }
                    }
                )
            }
                
        }
    },


    update : (req, res)=>{
        var id = req.params.shopId;
        var isOwner = authIsOwner(req, res);
        if(isOwner){
            db.query('select * from shop where shop_id = ?',[id], (err, result)=>{

                var context = {
                    menu: "menuForMember.ejs",
                    // who: req.session.name,
                    body: 'shopCU.ejs',
                    // logined: req.session.is_logined ? 'YES' : 'NO',
                    shop: result[0],
                }
                req.app.render('home', context, (err, html)=>{
                    res.end(html);
                })
            })
        }
    },

    update_process : (req, res, file) =>{
        var post = req.body;
        var isOwner = authIsOwner(req, res);
        if(isOwner){
            if(file === 'No'){
                db.query('update merchandise set category = ?, name = ?, price = ?, stock =?, brand = ?, supplier = ?, sale_yn = ?, sale_price = ? where mer_id = ?',
                [post.category, post.name, post.price, post.stock, post.brand, post.supplier, post.sale_yn, post.sale_price, post.mer_id], (err, results)=>{
                    if(err){console.log(err)}
                    else{
                        res.writeHead(302, {Location: '/merchandise/view/u'});
                        res.end();
                    }
                   
                })
            }
            else {
                db.query('update merchandise set category = ?, name = ?, price = ?, stock =?, brand = ?, supplier = ?, image = ?, sale_yn = ?, sale_price = ? where mer_id = ?',
                [post.category, post.name, post.price, post.stock, post.brand, post.supplier, file, post.sale_yn, post.sale_price, post.mer_id], (err, results)=>{
                    if(err){console.log(err)}
                    else{
                        res.writeHead(302, {Location: '/merchandise/view/u'});
                        res.end();
                    }
                   
                })
            }
        }
    },

    delete_process : (req, res) =>{
        id = req.params.merId ;
        db.query('DELETE FROM merchandise WHERE mer_id = ?', [id], (error, result) => { 
            if(error) { throw error; }
            else{
                res.writeHead(302, {Location: '/merchandise/view/u'});
                res.end();
            }
        });
    }
}