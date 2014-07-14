var SOURCE_URL = 'https://spreadsheets.google.com/feeds/list/1OVnkMueJ4m4bhFuu5qATq7DCxyWEhCPstTue_OqKZlU/od6/public/values?alt=json-in-script&callback=JSON_CALLBACK';

angular.module('dinner-spin', []);

// Prevent Default Directive
angular.module('dinner-spin')
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

angular.module('dinner-spin')
  .controller('SpinCtrl', function ($scope, $http) {

    $http.jsonp(SOURCE_URL)
      .success(function (data) {
        $scope.choices = _.map(data.feed.entry, function (item) {
          return item.title.$t;
        });
        $scope.ready = true;
      });

    $scope.ready   = false;
    $scope.choices = {};
    $scope.choice  = null;

    $scope.getRandomChoice = function (choice) {
      var tmp = $scope.choices.slice(0);
      tmp.splice(tmp.indexOf(choice), 1);
      return tmp[Math.floor(Math.random() * tmp.length)];
    };

    $scope.chooseRestaurant = function () {
      $scope.transition = '';
      $scope.choice     = $scope.getRandomChoice($scope.choice);
      $scope.transition = 'animated bounceIn';
      return false;
    };
  });
