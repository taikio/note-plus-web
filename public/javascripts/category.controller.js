(function(){
	'use strict';

	angular
		.module('Note')
		.controller('categoryCtrl',categoryCtrl);

	categoryCtrl.$inject = ['$scope','noteService','$timeout','$log'];

	function categoryCtrl($scope,noteService, $timeout, $log) {

		$scope.categories = [];
		//var notes = [];
		$scope.loading = true;
		$scope.errorMessage = "";

		var setAmount = function () {

			var notes = noteService.getLocalNotes();
			if (notes == null){
				noteService.getNotes().success(function (data) {
					notes = data;

					$scope.errorMessage = "";
					$scope.categories[0].amount = 0;
					$scope.categories[1].amount = 0;
					$scope.categories[2].amount = 0;

					angular.forEach(notes,function (note){

						if (note.category == 1){
							$scope.categories[0].amount += 1
						}

						if (note.category == 2){
							$scope.categories[1].amount += 1
						}

						if (note.category == 3){
							$scope.categories[2].amount += 1
						}

					});

					noteService.setLocalNotes(notes);
					$log.debug("categories - fim");
					$timeout(function () {
						$scope.loading = false;
					},1000);
				}).error(function (err) {
					$scope.errorMessage = "Sem conexão de internet";
					$scope.loading = false;
				})
			}else{
				$scope.errorMessage = "";
				$scope.categories[0].amount = 0;
				$scope.categories[1].amount = 0;
				$scope.categories[2].amount = 0;

				angular.forEach(notes,function (note){

					if (note.category == 1){
						$scope.categories[0].amount += 1
					}

					if (note.category == 2){
						$scope.categories[1].amount += 1
					}

					if (note.category == 3){
						$scope.categories[2].amount += 1
					}

				});
				$timeout(function () {
					$scope.loading = false;
				},800);
			}

		};

		var getCategories = function () {

			$scope.categories = noteService.getCategories();

			//$timeout(function (){
			//	setAmount();
			//},1000);
			setAmount();

		};

		if (!noteService.isLoggedIn()){
			noteService.redirect("login");
		}
		else{
			getCategories();
		}


		$scope.logOut = function () {
			noteService.destroyUser();
			noteService.redirect("login");
		};

		$scope.account = function() {
			noteService.redirect("account");
		};

		$scope.selectCategory = function (id){
			noteService.setCategory(id);
			noteService.redirect("list");
		};

		$scope.syncNotes = function () {
			$scope.loading = true;

			noteService.syncLocalNotes().success(function (data) {
				noteService.setLocalNotes(data);
				setAmount();
			}).error(function (error) {
				alert("Falha ao sincrinizar com o servidor!");
			});

			$timeout(function (){
				$scope.loading = false;
			},1000);

		}



	}
})();
