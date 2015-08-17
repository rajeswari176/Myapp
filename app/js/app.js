'use strict';

/* App Module */

angular.module('EcafeApp', [
      'ngRoute',
       'Ecafedirectives'
    ])

.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/Menu', {
        templateUrl: 'views/word-cloud.html',
        controller: 'WordCloudCtrl'
      }).
      when('/Meet', {
        templateUrl: 'views/search.html',
        controller: 'SearchController'
      }).
      otherwise({
        redirectTo: '/Menu'
      });
  }]);

