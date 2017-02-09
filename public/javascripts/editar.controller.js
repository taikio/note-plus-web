/**
 * Created by welker on 08/07/16.
 */
 (function(){
    'use strict';

    angular
    .module('Note')
    .controller('editarCtrl',editarCtrl);

    editarCtrl.$inject = ['$scope','noteService','$timeout','DBService'];

    function editarCtrl($scope, noteService, $timeout, DBService){
        $scope.loading = false;
        var category = noteService.getCategory();
        $scope.title = "";

        if (category === 1 || category === "1"){
            $scope.title = "Empresarial";
        }else
        if (category === 2 || category === "2"){
            $scope.title = "Pessoal";
        }else
        if (category === 3 || category === "3"){
            $scope.title = "Acadêmico";
        }

        var resetSring = function (str) {
            var pattern = eval(/<br>/g);
            var test = str.replace(pattern,"\n");
            
            return test;
        };

        var formatString = function (str) {
            var pattern = eval(/(\r)?\n/g);

            return str.replace(pattern,"<br>");
        };

        var getNote = function() {
            $scope.note = noteService.getNote();
            $scope.note.description = resetSring($scope.note.description);
        };   

        if (!noteService.isLoggedIn()) {
            noteService.redirect("login");
        }
        else{
            getNote();
        }     

        $scope.save = function (note){
            $scope.loading = true;

            var note = angular.copy(note);
            note.description = formatString(note.description);

            noteService.editNote(note).success(function (data){

                DBService.deletar('notes').then(function (value) {

				},
				function (err) {
					console.log(err);
					$scope.loading = false;
				}).then(
					noteService.getNotes().success(function (notes) {
						DBService.salvar('notes', notes).then(function (value) {
							$scope.loading = false;
							noteService.redirect('list');
						})
					}).error(function (err) {
						$scope.loading = false;
						alert("Sem conexão de internet!");						
					})
				);
				}).error(function (){
					alert("Sem conexão de internet!");
					$scope.loading = false;
				});

        }
    }
})();