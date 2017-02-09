/**
 * Created by welker on 19/05/16.
 */
(function(){
    'use strict';

    var User = require('../model/userModel');
    var jwt = require('jsonwebtoken');
    var token = "";


    var categories = [
        {id: 1, name: "Empresarial", amount: 0},
        {id: 2, name: "Pessoal", amount: 0},
        {id: 3, name: "Acadêmico", amount: 0}
    ];



    module.exports.categories = function (req, res){
        var username =   req.body.username;
        token = req.body.token;
        console.log(username);
        console.log(token);
        User.findOne({username: username}, function (err, data){
            if (err){
                console.log("categories / erro na busca");
                res.send(404);
            }
            if (data == null || data == undefined){
                console.log("categories / usuario invalido");
                res.send(404);
            }else{
                jwt.verify(token.token, data.secretKey, function (err, data){
                    if (err){
                        console.log("categories / erro ao verificar");
                        res.send(404);
                    }else{
                        res.json(categories);
                    }
                });

            }



        });
    };
})();