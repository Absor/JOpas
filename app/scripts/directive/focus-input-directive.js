angular.module('JOpas')
    .directive('focusInput', function($timeout) {
        return function(scope, element, attr) {
            element.on('click', function(event) {
                $timeout(function() {
                    element.find('input')[0].focus();
                });
            });
        };
    });