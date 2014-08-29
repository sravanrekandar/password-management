'use strict';

// Sub modules
angular.module('pwdManageApp.controllers', []);
angular.module('pwdManageApp.services', []);
angular.module('pwdManageApp.filters', []);
angular.module('pwdManageApp.directives', []);


window.app = angular.module('pwdManageApp', [
    'ngRoute',
    'ngResource',
    'ngClipboard',
    'pwdManageApp.filters',
    'pwdManageApp.services',
    'pwdManageApp.directives',
    'pwdManageApp.controllers'
])
.config(['ngClipProvider', function(ngClipProvider) {
    //ngClipProvider.setPath("/bower_components/zeroclipboard/dist/ZeroClipboard.swf");
}])
.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when('/search', {
            templateUrl: 'app/search/search.html',
            controller: 'SearchCtrl'
        })
        .when('/add', {
            templateUrl: 'app/add/add.html',
            controller: 'AddCtrl'
        })
        .when('/manage', {
            templateUrl: 'app/manage/manage.html',
            controller: 'ManageCtrl'
        });
    $routeProvider.otherwise({redirectTo: '/search'});
}])
.value('lodash', _);
