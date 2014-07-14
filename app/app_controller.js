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
