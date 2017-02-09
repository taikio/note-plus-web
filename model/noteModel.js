(function(){
    'use strict';

    var mongoose = require('mongoose');
    var Schema = mongoose.Schema;

    var noteSchema = new Schema({
        title: String,
        description: String,
        category: Number,
        user: String,
        date: { type: Date, default: Date.now }
    }, { autoIndex: false });

    module.exports = mongoose.model('Note', noteSchema);
})();