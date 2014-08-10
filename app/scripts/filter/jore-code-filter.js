angular.module('JOpas')
    .filter('joreCode', function() {
        return function(input) {
//            The code consists of following parts:
//            1. character = area/transport type code (e.g. 2)
//            2.-4. character = line code (e.g. 102)
//            5. character = letter variant (e.g. T)
//            6. character = letter variant or numeric variant (numeric variants are usually not used for base routes and are not shown to the end users)
//            7. character = direction (always 1 or 2), not shown to end users

            return input.substr(1, 4).replace(/^(0+)/g, '');
        };
    });