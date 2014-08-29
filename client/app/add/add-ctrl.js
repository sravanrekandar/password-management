'use strict';
window.app.controller('AddCtrl', [
	'$scope', 
	'PagesSvc',
	function($scope, PagesSvc){
		$scope.query = {};
		$scope.query.username = "admin";
		$scope.query.password = "admin";
		$scope.addPage = function(query){
			PagesSvc.addPage({
				"page": query.pagename,
				"category": query.category,
				"user": query.username,
				"password": query.password,
				"updated": Date.parse(new Date())
			});
		};
	}])
;
