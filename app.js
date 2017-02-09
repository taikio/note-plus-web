
/**
 * Module dependencies.
 */
 (function(){
    'use strict';

    var express = require('express')
    , routes = require('./routes')
    , urlCadastro = require('./routes/cadastrar')
    , urlLogin = require('./routes/login')
    , urlCategories = require('./routes/categories')
    , urlNotes = require('./routes/notes');

    var bodyParser = require('body-parser');
    var cors = require('cors');
    var app = module.exports = express();
    const IP = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
    const PORT = process.env.OPENSHIFT_NODEJS_PORT || 8090;
    const mongoose = require('mongoose');
    var mongooseOptions = {poolSize: 3};

    // Configuration
    app.configure(function(){
        app.set('views', __dirname + '/views');
        app.set('view engine', 'jade');
            //app.use(express.bodyParser());
            //app.use(express.methodOverride());
            //app.use(app.router);
            app.use(bodyParser.json());
            app.use(bodyParser.urlencoded({ extended: false }));
            app.use(express.static(__dirname + '/public'));
            app.use(cors());
        });

    app.configure('development', function(){
        app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
    });

    app.configure('production', function(){
        app.use(express.errorHandler());
    });

    // access cross origin
    app.all('*', function(req, res, next) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
        res.header('Access-Control-Allow-Headers', 'Content-Type');
        next();
    });

    // Open mongodb connection
    try{
        mongoose.connect('mongodb://mongo:taikio@ds043694.mongolab.com:43694/chat', mongooseOptions);
            //mongoose.connect('mongodb://localhost/test');
    }catch(err){
        throw err;
    }

    // Routes
    app.get('/', routes.index);
    app.put('/cadastrar', urlCadastro.cadastrar);
    app.put('/login', urlLogin.login);
    app.put('/editUser', urlLogin.editUser);
    app.put('/categories', urlCategories.categories);
    app.put('/add', urlNotes.create);
    app.put('/getnotes', urlNotes.getNotes);
    app.put('/edit', urlNotes.editNotes);
    app.put('/delete', urlNotes.deleteNotes);


    // Close connection when aplication is closed
    process.on('SIGINT', function() {
    mongoose.connection.close(function () {
        console.log('Mongoose default connection disconnected through app termination');
        process.exit(0);
    });
    });

    app.listen(PORT, IP, function () {
    console.log( "Listening on " + IP + ", server_port " + PORT);
    });


})();
