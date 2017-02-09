/**
 * Created by welker on 02/06/16.
 */
(function(){
    'use strict';

    const noteController = require('../controllers/noteController');

    module.exports.create = function (req, res){
        let username = req.body.username;
        let token = req.body.token;
        let n = req.body.note;
        
        console.log("---- createnotes -----");
        console.log(username);

        noteController.getSecretKey(username, res)
        .then(function (secretKey) {
            noteController.verifyToken(token.token,secretKey, res)
        })
        .then(function (isVerified) {
            noteController.saveNote(username, n, res)
        });
    };

    module.exports.getNotes = function (req, res){
        let username = req.body.username;
        let token = req.body.token;  
        let n = {};     

        console.log("---- getnotes -----");
        console.log(token);
        console.log(username);

        noteController.getSecretKey(username, res)
        .then(function (secretKey) {
            noteController.verifyToken(token.token,secretKey, res)
        })
        .then(function (isVerified) {
            noteController.retrieveNotes(username, res);
        });
    };

    module.exports.editNotes = function (req, res){
        let username = req.body.username;
        let token = req.body.token;
        let note = req.body.note;

        console.log("---- editnotes -----");
        console.log(token);
        console.log(username);
        console.log(note);

        noteController.getSecretKey(username, res)
        .then(function (secretKey) {
            noteController.verifyToken(token.token,secretKey, res)
        })
        .then(function (isVerified) {
            noteController.updateNotes(username, note, res);
        });
    };

    module.exports.deleteNotes = function (req, res){
        let username = req.body.username;
        let token = req.body.token;
        let note = req.body.note;

        console.log("---- deletenotes -----");
        console.log(token);
        console.log(username);
        console.log(note);

        noteController.getSecretKey(username, res)
        .then(function (secretKey) {
            noteController.verifyToken(token.token,secretKey, res)
        })
        .then(function (isVerified) {
            noteController.removeNotes(username, note, res);
        });

    }

})();
