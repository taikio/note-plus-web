(function () {
    'use stricts';

    var Note = require('../model/noteModel');
    var User = require('../model/userModel');
    var jwt = require('jsonwebtoken');
    var token = "";
    var ordenedArray = [];
    var noteController = {};

    var ordenateFunction = function(a, b) {
        return a.date - b.date;
    };

    function errorHandler (err, res){
      if (err){
          console.log(err);
          res.send(404);
      }
    };

    noteController.getSecretKey = function (username, res) {
        return new Promise(function (fulfill, reject) {
            User.findOne({username: username}, function (err, data){
                if (err) reject(err);
                console.log(data);
                fulfill(data.secretKey);
            });
        });
    }

    noteController.verifyToken = function (token, secretKey, res) {
        return new Promise(function (fulfill, reject) {
            jwt.verify(token, secretKey, function (err, data){
                if (err) reject(err);
                fulfill(true);
            });
        });
    }

    noteController.saveNote = function (username, n, res) {
        var note = new Note({
            title: n.title,
            description: n.description,
            category: n.category,
            user: username
        });
        console.log(note);

        note.save(function(err){
            errorHandler(err, res);
            res.json({status: "cadastrada"});
        });     
    }
    
    noteController.retrieveNotes = function (username, res) {
        Note.find({user: username}, function (err, data){
            errorHandler(err);
            ordenedArray = data.sort(ordenateFunction);
            res.json(ordenedArray);
        });
    }

    noteController.updateNotes = function (username, note, res) {
        var query = {user: username, title: note.title, category: note.category};
        Note.findOne(query,function (err, data){
            errorHandler(err, res);
            console.log("nota encontrada");
            console.log(data);
            data.description = note.description;
            data.save(function(err) {
                errorHandler(err, res);             
            });
        res.json({status: "Nota editada"});        
        });
    }

    noteController.removeNotes = function (username, note, res) {
        var query = {title: note.title, user: username, category: note.category};
        Note.findOneAndRemove(query, function (err) {
            errorHandler(err, res);        
            res.json({status: "nota deletada"});
        });
    }

    module.exports = noteController;
})();