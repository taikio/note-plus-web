(function(){
	'use strict';

	angular
	.module('Note')
	.controller('newNoteCtrl',newNoteCtrl);

	newNoteCtrl.$inject = ['$scope','noteService','$timeout','$log','DBService'];

	function newNoteCtrl($scope, noteService, $timeout, $log, DBService) {
		$scope.note = {title: "", description: ""};
		$scope.loading = false;
		$scope.errorMessage = "";

		if (!noteService.isLoggedIn()) {
			noteService.redirect("login");
		}

		var formatString = function (str) {
			var pattern = eval(/(\r)?\n/g);

			return str.replace(pattern,"<br>");
		};
		var setNoteCategory = function (note) {
			switch ($scope.category) {
				case "Empresarial":
					note.category = 1;
					break;
				case "Pessoal":
					note.category = 2;
					break;		
				case "Acadêmico":
					note.category = 3;
					break;				
			
				default:
					break;
			}
		};

		$scope.save = function (note){

			$log.debug(note);
			//if(note.title.length <= 0 || note.description.length <= 0){
			//	alert("Preencha os campos corretamente");
			//}
			if ($scope.category == "") {
				alert("Selecione uma categoria");
				return;
			}
			if(note.title.length < 34 && note.description.length > 4 && note.title.length > 0){
				$scope.loading = true;
				var note = angular.copy(note);
				note.description = formatString(note.description);
				setNoteCategory(note);

				noteService.saveNote(note).success(function (data){

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

			}else{
				alert("Preencha os campos corretamente");
			}

		};
	}
})();
