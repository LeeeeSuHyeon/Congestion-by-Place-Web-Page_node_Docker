// 201935312 이수현 lib/shop.js

var db = require('./db');

function authIsOwner(req, res){
    if(req.session.is_logined){return true}
    else{return false}
}

module.exports = {
    home : (req,res) =>{
        // var isOwner = authIsOwner(req, res);
        db.query("select * from shop", (err, results) => {
            var context = {
                menu: 'menuForCustomer.ejs',
                body: 'shop.ejs',
                shops : results,
            }

            req.app.render('home', context, (err,html)=>{
                res.end(html);
            });
            
        })
        
    }
}
