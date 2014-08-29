'use strict';
window.app.controller('ManageCtrl', [
	'$scope', 
	'PagesSvc',
	function($scope, PagesSvc){
		$scope.page = PagesSvc.editingPage;
		$scope.copyToClipboard = function (text) {
			console.log(text);
			window.clipboardData.setData('Text', text);
		};
		$scope.getTextToCopy = function(){
			return "SA";
		};
		$scope.doSomething = function () {
        	console.log("NgClip...");
    	}

	}])
;
