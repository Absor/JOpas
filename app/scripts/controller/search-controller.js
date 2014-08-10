angular.module('JOpas')

    .controller('SearchCtrl', function ($scope) {
        $scope.routeLocations = {
            from: {},
            via: {},
            to: {}
        }
    });