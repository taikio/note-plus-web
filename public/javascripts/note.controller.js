(function(){
	'use strict';

	angular
		.module('Note')
		.controller('noteCtrl',noteCtrl);

	noteCtrl.$inject = ['$scope','noteService','DBService'];

	function noteCtrl($scope, noteService, DBService) {
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

		var getNote = function() {
			$scope.note = noteService.getNote();
		};

		if (!noteService.isLoggedIn()) {
			noteService.redirect("login");
		}
		else{
			getNote();
		}

		$scope.del = function (note) {
			$scope.loading = true;
			noteService.deleteNote(note).success(function (data){
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
			}).error(function (err){
				$scope.loading = false;
				alert("Sem conexão de internet!");
			});

		};

		$scope.edit = function (){
			noteService.redirect("edit");
		}
	}
})();