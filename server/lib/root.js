// 201935312 이수현 lib/root.js

var db = require('./db');

function authIsOwner(req, res){
    if(req.session.is_logined){return true}
    else{return false}
}


module.exports = {
    home: (req, res) => {
        var isOwner = authIsOwner(req, res);
        var menuType = isOwner ? 'menuForMember.ejs' : 'menuForCustomer.ejs';

        db.query("select * from shop", (err, results) => {
            var context = {
                menu: menuType,
                body: 'shop.ejs',
                shops: results,
                name: req.session.name,
                licence: req.session.licence,
                update: 'NO'
            };
            res.json(context);
        });
    }
};
