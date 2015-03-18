/**
 * Created by Tobias on 2015-03-04.
 */
var authentication = angular.module('authentication', []);

authentication.config(['$controllerProvider', '$httpProvider',
    '$compileProvider', '$filterProvider', '$provide',
    function ( $controllerProvider,$httpProvider, $compileProvider, $filterProvider, $provide) {
        authentication.register =
        {
            controller: $controllerProvider.register,
            directive: $compileProvider.directive,
            filter: $filterProvider.register,
            factory: $provide.factory,
            service: $provide.service
        };

    }]);


