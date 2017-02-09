/**
 * Created by welker on 27/04/16.
 */

 (function(){
    'use strict';

    angular
    .module('Note')
    .factory('noteService',noteService);

    noteService.$inject = ['$http','localStorageService','$state','$log','DBService','$q'];

    function noteService($http, localStorageService, $state, $log, DBService, $q){

        var serverAddress = 'http://noteplus-javasources.rhcloud.com';
        //var serverAddress = 'http://127.0.0.1:8080';
        var categoryId = 0;
        var noteId = 0;

        var selectedNote = {};

        var categories = [
        {id: 1, name: "Empresarial", amount: 0},
        {id: 2, name: "Pessoal", amount: 0},
        {id: 3, name: "Acadêmico", amount: 0}
        ];

        var _createUser = function (usr){
            return $http.put(serverAddress+'/cadastrar', usr);
        };

        var _setUser = function (usr){
            return $http.put(serverAddress+'/login', usr);
        };

        var _isLoggedIn = function (){
            var username = localStorageService.get('user');
            if (username != "" && username != null){
                return true;
            }
            return false;
        };

        var _getUser = function () {
            return localStorageService.get('user');
        };

        var _editUser = function (pass) {
            var usr = localStorageService.get('user');
            return $http.put(serverAddress+ '/editUser', {username: usr, password: pass});
        };

        var _getCategories = function (){
            return categories;
        };

        var _syncLocalNotes = function () {

            var token = localStorageService.get('token');
            var user = localStorageService.get('user');

            return $http.put(serverAddress+'/getnotes', {username: user, token: token});
        };

        var _destroySession = function () {
            DBService.deletar('notes').then(function (value) {
                localStorageService.clearAll();
                _redirect('login');
            },
            function (err) {
                console.log(err);
            });
        }

        var _getNotes = function (){
            var token = localStorageService.get('token');
            var user = localStorageService.get('user');
            return $http.put(serverAddress+'/getnotes', {username: user, token: token});
        };

        var _saveNote = function (n){
            var username = localStorageService.get('user');
            var token = localStorageService.get('token');
            return $http.put(serverAddress+'/add',{username : username, token: token, note: n});
        };

        var _setCategory = function (id){
            localStorageService.set('category', id);
        };

        var _getCategory = function (){
            return localStorageService.get('category');
        };

        var _selectNote = function (note){
            localStorageService.remove('selectedNote');
            localStorageService.set('selectedNote', note);
        };

        var _getNote = function (){
            return localStorageService.get('selectedNote');
        };

        var _editNote = function (note){
            var username = localStorageService.get('user');
            var token = localStorageService.get('token');
            return $http.put(serverAddress + '/edit', {note: note, username: username, token: token});
        };

        var _redirect = function (context) {
            $state.go(context);
        };

        var _deleteNote = function (note) {
            var username = localStorageService.get('user');
            var token = localStorageService.get('token');
            return $http.put(serverAddress + '/delete', {note: note, username: username, token: token});
        };

        return {
            createUser: _createUser,
            setUser: _setUser,
            isLoggedIn: _isLoggedIn,
            getUser: _getNote,
            editUser: _editUser,
            selectNote: _selectNote,
            saveNote: _saveNote,
            getNote: _getNote,
            getNotes: _getNotes,
            getCategories: _getCategories,
            setCategory: _setCategory,
            getCategory: _getCategory,
            redirect: _redirect,
            deleteNote: _deleteNote,
            editNote: _editNote,
            syncLocalNotes: _syncLocalNotes,
            destroySession: _destroySession

        }
    }
})();
