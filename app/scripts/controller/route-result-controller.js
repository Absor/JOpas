angular.module('JOpas')

    .controller('RouteResultCtrl', function ($scope) {
        $scope.getStartTime = function () {
            var part = _.first($scope.resultRoute);
            var leg = _.first(part.legs);
            var loc = _.first(leg.locs);
            var time = moment(loc.depTime, "YYYYMMDDHHmm");
            return time.format('HH:mm');
        };

        $scope.getEndTime = function () {
            var part = _.last($scope.resultRoute);
            var leg = _.last(part.legs);
            var loc = _.last(leg.locs);
            var time = moment(loc.arrTime, "YYYYMMDDHHmm");
            return time.format('HH:mm');
        };

        var formatTime = function(timeInSeconds) {
            var time = moment().startOf('day');
            time.add('seconds', timeInSeconds);
            var output = "";
            if (time.hours() !== 0) {
                output += time.hours() + " h";
            }
            if (time.minutes() !== 0) {
                if (output.length !== 0 ) {
                    output += " ";
                }
                output += time.minutes() + " min";
            }
            return output;
        };

        $scope.getTotalTime = function() {
            var durationInSeconds = _.reduce($scope.resultRoute, function(sum, part) {
                return sum + part.duration;
            }, 0);

            return formatTime(durationInSeconds);
        };

        $scope.getTotalDistance = function() {
            var distanceInMeters = _.reduce($scope.resultRoute, function(sum, part) {
                return sum + part.length;
            }, 0);

            if (distanceInMeters < 1000) {
                return distanceInMeters + " m";
            }
            return (distanceInMeters / 1000).toFixed(1) + " km";
        };

        $scope.getTotalWalkTime = function() {
            var durationInSeconds = _.reduce($scope.resultRoute, function(sum, part) {
                return sum + _.reduce(part.legs, function(sum, leg) {
                    if (leg.type === "walk") {
                        return sum + leg.duration;
                    }
                    return sum;
                }, 0);
            }, 0);

            return formatTime(durationInSeconds);
        };

        $scope.getTotalWalkDistance = function() {
            var distanceInMeters = _.reduce($scope.resultRoute, function(sum, part) {
                return sum + _.reduce(part.legs, function(sum, leg) {
                    if (leg.type === "walk") {
                        return sum + leg.length;
                    }
                    return sum;
                }, 0);
            }, 0);

            if (distanceInMeters < 1000) {
                return distanceInMeters + " m";
            }
            return (distanceInMeters / 1000).toFixed(1) + " km";
        };

        $scope.getFirstTransport = function() {
            var part = _.first($scope.resultRoute);
            var leg = _.find(part.legs, function(leg) {
                return leg.type !== "walk";
            });
            if (!leg) {
                return "";
            }
            var loc = _.first(leg.locs);
            var time = moment(loc.depTime, "YYYYMMDDHHmm");
            return time.format('HH:mm') + " from " + loc.name + " (" + loc.code + ")";
        };

        $scope.getAllLegs = function() {
            return _.reduce($scope.resultRoute, function(array, part) {
                return array.concat(part.legs);
            }, []);
        };

        $scope.isVia = function() {
            return $scope.resultRoute.length === 2;
        };
    });