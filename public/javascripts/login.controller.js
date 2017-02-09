(function(){
    'use strict';

    angular
        .module('Note')
        .controller('loginCtrl',loginCtrl);

    loginCtrl.$inject = ['$scope','noteService','localStorageService'];

    function loginCtrl($scope,noteService, localStorageService) {

        $scope.user = {username: "", password: ""};
        $scope.loading = false;

        if (noteService.isLoggedIn()){
            noteService.redirect("list");
        }

        $scope.login = function (user) {
            $scope.loading = true;
            noteService.setUser(user).success(function(data) {

                var token = data;
                localStorageService.set('user', user.username);
                localStorageService.set('token', token);
                $scope.loading = false;
                noteService.redirect("list");
            }).error(function(error) {
                $scope.loading = false;
                alert("Dados de login incorretos, ou pode ser que o servidor esteja em manutenção");
            });

        };

        $scope.novaConta = function (){
            noteService.redirect("cadastrar");
        }
    }
})();
