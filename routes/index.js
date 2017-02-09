
/*
 * GET home page.
 */
(function(){
	'use strict';

	module.exports.index = function(req, res){
		res.render('index', { title: 'Express' })
	};

})();