(function(){
    'use strict';

    angular
        .module('Note')
        .controller('accountCtrl',accountCtrl);

    accountCtrl.$inject = ['$scope','noteService'];

    function accountCtrl($scope,noteService) {
        $scope.loading = false;
        var user = "";

        var getUser = function() {
            user = noteService.getUser();
        }

        if (!noteService.isLoggedIn()){
            noteService.redirect("login");
        }
        else{
            getUser();
        }

        $scope.salvar = function (password) {
            $scope.loading = true;
            noteService.editUser(password).success(function(data) {
                $scope.loading = false;
                noteService.redirect("category");
            }).error(function(error) {
                
            });        

        };
        
    }
})();