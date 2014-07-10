/*global _:false */


(function(){
  'use strict';

  var SOURCE_URL = 'https://spreadsheets.google.com/feeds/list/1OVnkMueJ4m4bhFuu5qATq7DCxyWEhCPstTue_OqKZlU/od6/public/values?alt=json-in-script&callback=JSON_CALLBACK';

  angular.module('ng-rr-main',['ngRoute'])
    .config(function ($routeProvider) {
      $routeProvider
        .when('/', {
          templateUrl: 'main/main.html',
          controller: 'MainCtrl'
        });
    })
    .controller('MainCtrl', function ($scope, $http) {
      var choices = {};

      var getRandomChoice = function (current) {
        var tmp = choices.slice(0);
        tmp.splice(tmp.indexOf(current), 1);
        return tmp[Math.floor(Math.random() * tmp.length)];
      };

      $http.jsonp(SOURCE_URL)
        .success(function (data) {
          choices = _.map(data.feed.entry, function (item) {
             return item.title.$t;
          });
          $scope.ready = true;
        });

      $scope.ready = false;

      $scope.currentRestaurant = null;

      $scope.chooseRestaurant = function () {
        $scope.transition = '';
        $scope.currentRestaurant = getRandomChoice($scope.currentRestaurant);
        $scope.transition = 'animated bounceIn';
        return false;
      };
    })
    .directive('preventDefault', function () {
      return {
        restrict: 'A',
        link: function (scope, el) {
          el.bind('click', function (event) {
            event.preventDefault();
          });
        }
      };
    });

})();
