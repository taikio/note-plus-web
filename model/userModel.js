(function(){
    'use strict';

    var mongoose = require('mongoose');
    var Schema = mongoose.Schema;

    var userSchema = new Schema({
        username: String,
        email : String,
        password: String,
        secretKey: String
    });
    
    module.exports = mongoose.model('User', userSchema);
})();
