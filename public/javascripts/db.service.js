(function () {
    'use strict';

    angular
    .module("Note")
    .factory("DBService", dbService);

    dbService.$inject = ['$q'];

    function dbService($q) {
        var _store = localforage.createInstance({
      		name: "npStorage"
    	});

    	_store.setDriver([localforage.INDEXEDDB, localforage.LOCALSTORAGE]);
    	console.log(_store.supports(localforage.INDEXEDDB));

    	var _salvar = function(key, object) {
            return $q(function (resolve, reject) {
                var jsonObject = angular.toJson(object);
                _store.setItem(key, jsonObject).then(function (value) {
                    resolve(value);
                }).catch(function(err) {
                    reject(err);
                });
            });

    	};

    	var _retornar = function(key) {

            return $q(function (resolve, reject) {
				_store.getItem(key).then(function (data) {
					var jsonObject = angular.fromJson(data);
					resolve(jsonObject);
				}).catch(function (error) {
					reject(error);
				});
			});
    	};

    	var _deletar = function(key) {
            return $q(function (resolve, reject) {
                _store.removeItem(key).then(value => {
                    resolve(value);
                }).catch(err => {
                    reject(err);
                });
            });

    	};

    	return {
    		salvar: _salvar,
    		retornar: _retornar,
    		deletar: _deletar
    	}
    }
})();
