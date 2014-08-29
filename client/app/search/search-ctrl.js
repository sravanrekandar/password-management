'use strict';
window.app.controller('SearchCtrl', [
	'$scope', 
	'PagesSvc',
	function($scope, PagesSvc){
		// Find the available types in the pages
		var getCategories = function(){
			var i, 
				idx,
				categories=[],
				pages = $scope.pages;
			for(i=0; i < pages.length; i++) {
				idx = categories.indexOf(pages[i].category);
				if(idx === -1){
					categories.push({
						name: pages[i].category
					});
				}
			}
			return categories;
		};

		var setDetails = function(page) {
			$scope.selectedPage = page;
			PagesSvc.setEditingPage(page);
		};


		
		/* Whenever there is a change in the pages,
		 We need to update the types as well
		 (Its not implemented server side) 
		*/
		$scope.$watch('pages',function(n,o){
			$scope.categories = getCategories();
		},true);

		$scope.editPage = function(page){
			page._edit = true;
			setDetails(page);
		};
		$scope.savePage = function(page){
			page._edit = false;
			PagesSvc.savePage(page);
			setDetails(null);
		};
		$scope.deletePage = function(page) {
			PagesSvc.deletePage(page);
		};

		$scope.init = function(){
			$scope.pages = PagesSvc.getPages();
		};
	}])
;
