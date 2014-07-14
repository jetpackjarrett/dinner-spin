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
