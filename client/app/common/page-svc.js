'use strict';
window.app.factory('PagesSvc', [
	'$http', 
	function($http){
		var baseUrl = '/pages';
		var rest =  {
			get: function(pageId) {
				if(pageId){
					return $http.get(baseUrl + '/' + pageId);	
				} else{
					return $http.get(baseUrl);	
				}
			},
			save: function(page) {
				if(!page){return;}
				var url = page.id ? baseUrl + '/' + page.id : baseUrl;
				console.log(url);
				return $http.post(url, page);
			},
			delete: function(prodId) {
				return $http.delete(baseUrl + '/' + prodId);
			},
			filter: function(filterObj) {
				return $http.get(baseUrl + '/filter', {
					params: filterObj
				});
			}
		};

		var factory = {};
		factory.getPages = function(newRequest){
			var pages = [];
			if(factory.pages && !newRequest){
				pages = factory.pages;
			} else{
				rest.get().then(function(response){
					factory.pages = response.data;
					angular.extend(pages, factory.pages);
					factory.pages = pages;
				});
			}

			return pages;
		};

		factory.savePage = function(page){
			rest.save(page).then(function(response){
				console.log(response);
			})
		};
		factory.deletePage = function(page) {
			rest.delete(page.id).then(function(response){
				console.log(response);
				if(response.statusText === 'OK') {
					_.remove(factory.pages, function(item) {
						return item.id === page.id;
					})
				}
			});
		};
		factory.addPage = function(page) {
			rest.save(page).then(function(response){
				//update list
				factory.pages = factory.getPages(true);

			});
		};

		factory.setEditingPage = function(page){
			factory.editingPage = page;
		};
		return factory;
	}])
;