(function () {
  'use strict';
  angular
  .module("Note")
  .directive("npLoading", npLoading);

  function npLoading() {
    return {
      restrict: 'EA',
      scope: {
        loading: '='
      },
      templateUrl: 'loading/loading.html'
    }
  }
})();
