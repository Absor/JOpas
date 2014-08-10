angular.module('JOpas')

    .factory('Reittiopas', function ($http, $q) {
        var baseUrl = "http://api.reittiopas.fi/hsl/prod/?user=JOpas&pass=J0pasOnnisti&format=json&lang=fi";

        var geocodeCanceller;

        var geocode = function (key) {
            if (geocodeCanceller) {
                geocodeCanceller.resolve("cancel");
                geocodeCanceller = null;
            }

            geocodeCanceller = $q.defer();

            var promise = $http.get(baseUrl + "&request=geocode&key=" + key, { timeout: geocodeCanceller.promise});
            return promise;
        };

        var routeCanceller;

        var route = function (from, via, to, date, time, timetype, via_time) {
            if (routeCanceller) {
                routeCanceller.resolve("cancel");
                routeCanceller = null;
            }

            routeCanceller = $q.defer();

            var url = baseUrl + "&request=route&from=" + from; // paikat x,y koord
            if (via) {
                url += "&via=" + via;
            }
            url += "&to=" + to;
            if (date) {
                url += "&date=" + date;
            } // yyyymmdd
            if (time) {
                url += "&time=" + time;
            } // hhmm
            url += "&timetype=" + timetype; // arrival / departure
            if (via_time) {
                url += "&via_time=" + via_time
            } // time in minutes
            // zone
            // transport_types
            // optimize - walking and so on
            // change_margin
            // walk_speed
            // detail - ei välttämättä
            // show

            var promise = $http.get(url, { timeout: routeCanceller.promise});
            return promise;
        };

        return {
            geocode: geocode,
            route: route
        }
    });