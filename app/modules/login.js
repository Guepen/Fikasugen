/**
 * Created by Tobias on 2015-03-04.
 */
var login = angular.module('login', [ 'ngResource']);

login.config(['$controllerProvider', '$httpProvider',
    '$compileProvider', '$filterProvider', '$provide','$resourceProvider',
    function ( $controllerProvider,$httpProvider, $compileProvider, $filterProvider, $provide, $resourceProvider) {
        $httpProvider.defaults.useXDomain = true;
        $resourceProvider.defaults.stripTrailingSlashes = false;
        login.register =
        {
            controller: $controllerProvider.register,
            directive: $compileProvider.directive,
            filter: $filterProvider.register,
            factory: $provide.factory,
            service: $provide.service
        };

    }]);


