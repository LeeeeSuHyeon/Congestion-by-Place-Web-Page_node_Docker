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
        var isOwner = authIsOwner(req, res);

        if (vu === "v"){
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
                        update : 'YES'
                    };
        
                    req.app.render('home', context, (err, html)=>{
                        res.end(html);
                    })
    
                })
            }
        }
    },  // end of view

    customerView : (req, res)=>{
        var location = [{1:"교내"},{2:"태평동"},{3:"복정동"}]
        var category = [{1:"음식점"},{2:"카페"},{3:"헬스장"}]
        var LC = req.params.LC;
        var lc = req.params.lc;
        
        lc = (LC === "location") ? String(location.find(item => item[lc])[lc]) : String(category.find(item => item[lc])[lc])
        console.log(LC, lc)
        
        if(LC === "location"){
            db.query('select * from shop where location = ?', [lc], (err, results)=>{
                if(err){console.log(err)}
                console.log(results)
                var context= {
                    menu : "menuForCustomer.ejs",
                    body : 'shop.ejs',
                    shops : results,
                    update : 'NO'
                }
                req.app.render('home', context, (err, html)=>{
                    res.end(html);
                })
            })
        }
        else{
            db.query('select * from shop where category = ?', [lc], (err, results)=>{
                if(err){console.log(err)}
                console.log(results)
                var context= {
                    menu : "menuForCustomer.ejs",
                    body : 'shop.ejs',
                    shops : results,
                    update : 'NO'
                }
                req.app.render('home', context, (err, html)=>{
                    res.end(html);
                })
            })
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
                    name : req.session.name,
                    licence : req.session.licence,
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
        post.user = (post.is_open !== 'on') ? 0 : post.user
        post.is_open = (post.is_open === 'on') ? true : false
        if(isOwner){
            if(file === 'No'){
                db.query('update shop set location = ?, category = ?, name = ?, total_user = ?, user =?, start_time = ?, end_time = ?, is_open = ?, address = ?  where shop_id = ?',
                [post.location, post.category, post.name, post.total_user, post.user, post.start_time, post.end_time, post.is_open, post.address, post.shop_id], (err, results)=>{
                    if(err){console.log(err)}
                    else{
                        res.writeHead(302, {Location: `/shop/view/u/${req.session.licence}`});
                        res.end();
                    }
                   
                })
            }
            else {
                db.query('update shop set location = ?, category = ?, name = ?, total_user = ?, user =?, start_time = ?, end_time = ?, is_open = ?, address = ?, image = ? where shop_id = ?',
                [post.location, post.category, post.name, post.total_user, post.user, post.start_time, post.end_time, post.is_open, post.address, file, post.shop_id], (err, results)=>{
                    if(err){console.log(err)}
                    else{
                        res.writeHead(302, {Location: `/shop/view/u/${req.session.licence}`});
                        res.end();
                    }
                   
                })
            }
        }
    },

    delete_process : (req, res) =>{
        id = req.params.shopId ;
        db.query('DELETE FROM shop WHERE shop_id = ?', [id], (error, result) => { 
            if(error) { throw error; }
            else{
                res.writeHead(302, {Location: `/shop/view/u/${req.session.licence}`});
                res.end();
            }
        });
    }
}