// 201935312 이수현 lib/root.js

var db = require('./db');

function authIsOwner(req, res){
    if(req.session.is_logined){return true}
    else{return false}
}

module.exports = {
    home : (req,res) =>{
        var isOwner = authIsOwner(req, res);
        if(isOwner){
            db.query("select * from shop", (err, results) => {
                var context = {
                    menu: 'menuForMember.ejs',
                    body: 'shop.ejs',
                    shops : results,
                    name : req.session.name,
                    licence : req.session.licence,
                    update : 'NO'
                    // logined : req.session.is_logined ? 'YES' : 'NO',
                }
    
                req.app.render('home', context, (err,html)=>{
                    res.end(html);
                });
                
            })
        }
        db.query("select * from shop", (err, results) => {
            var context = {
                menu: 'menuForCustomer.ejs',
                body: 'shop.ejs',
                shops : results,
                update : 'NO'
                // logined : req.session.is_logined ? 'YES' : 'NO',
            }

            req.app.render('home', context, (err,html)=>{
                res.end(html);
            });
            
        })
        
    }
}
