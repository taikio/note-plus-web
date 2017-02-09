(function(){
	'use strict';

	angular
	.module('Note')
	.controller('noteListCtrl',noteListCtrl);

	noteListCtrl.$inject = ['$scope','noteService','$timeout','localStorageService','DBService'];

	function noteListCtrl($scope, noteService, $timeout, localStorageService, DBService) {

		$scope.errorMessage = "";
		$scope.loading = true;
		$scope.notes = [];
		$scope.categories = [	{amount: 0}, {amount: 0}, {amount: 0}	];
		$scope.user = localStorageService.get('user');
		console.log($scope.user);

		var category = noteService.getCategory();
		if (angular.isUndefined(category) || category === null) {
			noteService.setCategory(1);
			category = noteService.getCategory();
		}

		$scope.title = "";
		var n = [];

		var setTitle = function () {
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
		};

		setTitle();

		var getNotes = function () {
			$scope.loading = true;
			$scope.notes = [];
			category = noteService.getCategory();
			setTitle();
			$scope.categories[0].amount = 0;
			$scope.categories[1].amount = 0;
			$scope.categories[2].amount = 0;

			DBService.retornar('notes').then(function (value){
				n = value;
				if (n !== null) {
					if (n.length > 0){
						n.forEach(function(item) {

							if (item.category == 1){
								$scope.categories[0].amount += 1
							}
							if (item.category == 2){
								$scope.categories[1].amount += 1
							}
							if (item.category == 3){
								$scope.categories[2].amount += 1
							}
							if (item.category === category){
								$scope.notes.push(item);
							}
						});
						if (n.length > 0 && $scope.notes.length <= 0){
							$scope.errorMessage = "Nenhuma anotação nesta categoria";
						}
						$scope.loading = false;
					}
				}else{
					noteService.getNotes().success(function (data) {
						n = data;
						DBService.salvar('notes',n).then(function (value) {
							n.forEach(function(item) {
								if (item.category == 1){
									$scope.categories[0].amount += 1
								}
								if (item.category == 2){
									$scope.categories[1].amount += 1
								}
								if (item.category == 3){
									$scope.categories[2].amount += 1
								}
								if (item.category === category){
									$scope.notes.push(item);
								}
							});
							if (n.length > 0 && $scope.notes.length <= 0){
								$scope.errorMessage = "Nenhuma anotação nesta categoria";
							}
							$scope.loading = false;
						},
						function (err) {
							console.log(err);
							$scope.loading = false;
						});
					}).error(function (err) {
							$scope.errorMessage = "Sem conexão de internet";
							$scope.loading = false;
					});
				}

			},function (err){
				console.log(err);
				$scope.loading = false;
			});

			// if (angular.isUndefined(n) || n.length <= 0) {
			// 	noteService.getNotes().success(function (data) {
			// 		n = data;
			// 		noteService.setLocalNotes(n);
			// 		n.forEach(function(item) {
			// 			if (item.category == 1){
			// 				$scope.categories[0].amount += 1
			// 			}
			// 			if (item.category == 2){
			// 				$scope.categories[1].amount += 1
			// 			}
			// 			if (item.category == 3){
			// 				$scope.categories[2].amount += 1
			// 			}
			// 			if (item.category === category){
			// 				$scope.notes.push(item);
			// 			}
			// 		});
			// 		if (n.length > 0 && $scope.notes.length <= 0){
			// 			$scope.errorMessage = "Nenhuma anotação nesta categoria";
			// 		}
			// 		$scope.loading = false;
			// 	}).error(function (err) {
			// 			$scope.errorMessage = "Sem conexão de internet";
			// 			$scope.loading = false;
			// 	});
			//
			// }

		}

		if (!noteService.isLoggedIn()) {
			noteService.redirect("login");
		}
		else{
			getNotes();
		}


		$scope.selectNote = function (note){
			noteService.selectNote(note);
			noteService.redirect("note");
		};

		$scope.addNote = function (){
			noteService.redirect("new");
		};

		$scope.selectCategory = function (id){
			noteService.setCategory(id);
			$scope.show = false;
			$timeout(function () {
				getNotes();
			}, 400);

		};

		$scope.logOut = function () {
			$scope.show = false;
			noteService.destroySession();
		};

		$scope.account = function() {
			$scope.show = false;
			noteService.redirect("account");
		};

		$scope.syncNotes = function () {
			$scope.loading = true;
			$scope.show = false;

			noteService.syncLocalNotes().success(function (data) {

				DBService.deletar('notes').then(function (value) {
					console.log("Notas deletadas");
				},
				function (err) {
					console.log(err);
				}).then(DBService.salvar('notes', data).then(function (value) {

				},
				function (err) {
					console.log(err);
				}));

				//noteService.setLocalNotes(data);
				getNotes();
			}).error(function (error) {
				alert("Falha ao sincrinizar com o servidor!");
			});

			$timeout(function (){
				$scope.loading = false;
			},1000);

		};

	}
})();
