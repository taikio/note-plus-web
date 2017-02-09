(function(){
    'use strict';
    
    const cadastrarController = require('../controllers/cadastrarController');

    module.exports.cadastrar = function (req, res){
        var u = {username: "", email: "", password: "", secretKey: ""};

        u.username = req.body.username;
        u.email = req.body.email;
        u.password = req.body.password;

        cadastrarController.createUser(u, res);

        //if (u.username != "" && u.email != "" && u.password != ""){
        //
        //    User.findOne({username : u.username}, function (err, data){
        //        console.log("buscando...");
        //        if (err) throw err;
        //        console.log(data);
        //        if (data != null){
        //            console.log("Usuário já cadastrado");
        //            res.send(400);
        //        }else{
        //            secretKey = bcrypt.genSaltSync(5);
        //            var user = new User({
        //                username: u.username,
        //                email: u.email,
        //                password: u.password,
        //                secretKey: secretKey
        //            });
        //
        //            user.save(function (err){
        //                if (err){
        //                    throw err;
        //                }else{
        //                    res.json({status: "cadastrado"});
        //                }
        //            });
        //        }
        //    });
        //
        //
        //}
    };
})();
