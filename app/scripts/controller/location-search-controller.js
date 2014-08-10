angular.module('JOpas')

    .controller('LocationSearchCtrl', function ($scope, $stateParams, $ionicNavBarDelegate, Reittiopas) {
        $scope.searchKey = '';
        $scope.loading = false;
        $scope.myLocation = {name: "My location", locType: 'gps'};

        $scope.searchKeyChanged = function(key) {
            $scope.resultLocations = null;
            if (key.length < 3) {
                return;
            }
            $scope.error = null;
            $scope.loading = true;
            Reittiopas.geocode(key)
                .then(function(response) {
                    $scope.loading = false;
                    if (angular.isString(response.data)) {
                        $scope.error = "Reittiopas service might be busy. Try again later."
                        return;
                    }
                    if (!angular.isArray(response.data)) {
                        $scope.resultLocations = [response.data];
                    } else {
                        $scope.resultLocations = response.data;
                    }
                }, function(response) {
                    if (response.status === 0) {
                        return; // canceled
                    }
                    $scope.loading = false;
                    $scope.error = "There might be a problem with the connection."
                });
        };

        $scope.chooseLocation = function(location) {
            $scope.routeLocations[$stateParams.location] = location;
            $ionicNavBarDelegate.back();
        };
    });