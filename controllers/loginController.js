(function () {
    'use strict';

    var User = require('../model/userModel');
    var jwt = require('jsonwebtoken');
    var loginController = {};

    loginController.findUser = function (username, password, response){
        User.findOne({username : username, password : password}, function (err, data){
            errorHandler(err, response);
            createToken(data, response);
        })
    }

    var errorHandler = function (err, response){
      if (err){
          response.send(404);
      }
    }

    var createToken = function (dbUser, response){
        var token = "";
        try{
            token = jwt.sign({username : dbUser.username}, dbUser.secretKey);
        }catch(err){
            errorHandler(err, response);
        }
        response.json({token: token});
    };

    loginController.editUser = function (username, password, response){
        User.findOneAndUpdate({username : username},{$set: {password: password}}, function (err, data){
            errorHandler(err, response);
            response.json({status: "Senha alterada"});
        });
    };

    module.exports = loginController;
})();