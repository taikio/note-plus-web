/**
 * Created by welker on 18/05/16.
 */
(function(){
    'use strict';

    var User = require('../model/userModel');
    var jwt = require('jsonwebtoken');
    const loginController = require('../controllers/loginController');
    

    module.exports.login = function (req, res){
        var username = req.body.username;
        var password = req.body.password;
        console.log("Login "+ username);

        loginController.findUser(username, password, res);
    };

    module.exports.editUser = function(req, res) {
        var username = req.body.username;
        var password = req.body.password;

        console.log("------- Editar Usuário -----------");
        console.log(username);
        console.log(password);

        loginController.editUser(username, password, res);
    };
})();