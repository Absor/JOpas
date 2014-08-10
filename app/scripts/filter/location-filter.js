angular.module('JOpas')
    .filter('location', function() {
        return function(input, placeholder) {
            if (!angular.isObject(input) || !input.name) {
                return placeholder || '';
            }

            var output = input.name;
            if (input.locType == "address" && input.details && input.details.houseNumber) {
                output += " " + input.details.houseNumber;
            }
            if (input.city) {
                output += ", " + input.city;
            }
            return output;
        };
    });