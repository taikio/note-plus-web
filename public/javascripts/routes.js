/**
 * Created by welker on 05/07/16.
 */
(function(){
    'use strict';

    angular
        .module('Note')
        .config(['$stateProvider','$urlRouterProvider',function($stateProvider, $urlRouterProvider) {
            $stateProvider


                .state('login',{
                    url: '/',
                    templateUrl: 'templates/login.html',
                    controller: 'loginCtrl'
                })
                .state('category',{
                    url: '/category',
                    templateUrl: 'templates/category.html',
                    controller: 'categoryCtrl'
                })
                .state('list',{
                    url: '/list',
                    templateUrl: 'templates/noteList.html',
                    controller: 'noteListCtrl'
                })
                .state('new',{
                    url: '/new',
                    templateUrl: 'templates/newNote.html',
                    controller: 'newNoteCtrl'
                })
                .state('note',{
                    url: '/note',
                    templateUrl: 'templates/note.html',
                    controller: 'noteCtrl'
                })
                .state('cadastrar',{
                    url: '/cadastrar',
                    templateUrl: 'templates/cadastrar.html',
                    controller: 'cadastrarCtrl'
                })
                .state('edit',{
                    url: '/edit',
                    templateUrl: 'templates/editar.html',
                    controller: 'editarCtrl'
                })
                .state('account',{
                    url: '/account',
                    templateUrl: 'templates/account.html',
                    controller: 'accountCtrl'
                });

                $urlRouterProvider.otherwise('/');
        }]);
})();
