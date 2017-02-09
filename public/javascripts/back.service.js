(function() {
	'use strict';

	angular
	.module('Note')
	.factory('BackService',BackService);

	BackService.$inject = ['$state','noteService'];
	function BackService($state, noteService) {

		var _back = function(context) {
			var path = $state.get(context).name;

			switch (path){
				case 'note':
				$state.go('list');
				break;

				case 'list':
				navigator.app.exitApp();
				break;

				case 'new':
				$state.go('list');
				break;

				case 'edit':
				$state.go('list');
				break;

				case 'account':
				$state.go('list');
				break;

				case 'cadastrar':

				$state.go('login');
				break;

				case 'category':

				navigator.app.exitApp();
				break;

				case 'login':

				navigator.app.exitApp();
				break;
			}

		}

		return {
			back: _back
		}
	}
})();
