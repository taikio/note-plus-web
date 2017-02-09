(function(){
	'use strict';

	angular
		.module('Note')
		.filter('asHtml',asHtml);

	asHtml.$inject = ['$sce'];

	function asHtml($sce) {
		return function (input) {
			return $sce.trustAsHtml(input);
		};
	}
})();
