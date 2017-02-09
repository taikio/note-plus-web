/**
 * Created by welker on 17/05/16.
 */
(function(){
    'use strict';

    angular
        .module('Note')
        .controller('cadastrarCtrl',cadastrarCtrl);

    cadastrarCtrl.$inject = ['$scope','noteService'];

    function cadastrarCtrl($scope, noteService){
        $scope.loading = false;
        $scope.cadastrar = function (user){
            $scope.loading = true;
            noteService.createUser(user).success(function (data){
                $scope.loading = false;
                noteService.redirect("login");
            }).error(function(err){
                console.log(err);
                if (err == "Bad Request") {
                    alert("Este usuário já existe");
                }
                $scope.loading = false;
            });
        };
    }
})();