angular.module('JOpas', ['ionic', 'config'])

    .run(function ($ionicPlatform) {
        $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }
        });
    })

    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state('app', {
                url: "",
                abstract: true,
                templateUrl: "templates/menu.html"
            })

            .state('app.search', {
                url: "/search",
                abstract: true,
                template: '<ion-nav-view name="content" animation="slide-left-right"></ion-nav-view>',
                controller: "SearchCtrl"
            })

            .state('app.search.route', {
                url: "/route",
                views: {
                    'content': {
                        templateUrl: "templates/route.html",
                        controller: "RouteSearchCtrl"
                    }
                }
            })

            .state('app.search.route.results', {
                url: "/results",
                views: {
                    'content@app.search': {
                        templateUrl: "templates/route-results.html",
                    }
                }
            })

            .state('app.search.location', {
                url: "/location/:location",
                views: {
                    'content': {
                        templateUrl: "templates/location.html",
                        controller: "LocationSearchCtrl"
                    }
                }
            });

        $urlRouterProvider.otherwise('/search/route');
    });

//TODO $ionicNavBarDelegate.getPreviousTitle(); -tarkistus vieweissä, jotka tarvitsee backia

