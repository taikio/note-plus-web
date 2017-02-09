(function () {
    'use strict';

    var bcrypt = require('bcrypt-nodejs');
    var User = require('../model/userModel');
    var cadastrarController = {};

    cadastrarController.createUser = function (user, response){
        if (user.username != "" && user.email != "" && user.password != ""){
            User.findOne({username : user.username}, function (err, data){
                errorHandler(err, response);
                createKeyAndSave(data, user, response);
            })
        }else{
            response.send(404);
        }
    };

    var errorHandler = function (err, response){
      if (err){
          response.send(404);
      }
    };

    var createKeyAndSave = function (dbUser, requestUser, response){
        if (dbUser != null){
            response.send(400);
        }
        var secretKey = bcrypt.genSaltSync(5);
        var user = new User({
            username: requestUser.username,
            email: requestUser.email,
            password: requestUser.password,
            secretKey: secretKey
        });

        user.save(function (err){
            errorHandler(err, response);
            response.json({status: "cadastrado"});
        });
    };

    module.exports = cadastrarController;
})();