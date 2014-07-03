(function(){
	'use strict';

	angular.module('ng-rr', [ 'ngRoute','ng-rr-main','templates' ])
	  .config(function ($routeProvider) {
	    $routeProvider
	      .otherwise({
	        redirectTo: '/'
	      });
	  });
	  
})();