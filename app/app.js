'use strict';

define(['app/services/routeResolver'], function () {

    var app = angular.module('fikasugen', ['ngRoute', 'routeResolverServices']);

    app.config(['$routeProvider', 'routeResolverProvider', '$controllerProvider',
        '$compileProvider', '$filterProvider', '$provide', '$locationProvider',

        function ($routeProvider, routeResolverProvider, $controllerProvider,
                  $compileProvider, $filterProvider, $provide, $locationProvider) {

            //Change default views and controllers directory using the following:
            //routeResolverProvider.routeConfig.setBaseDirectories('/app/views', '/app/controllers');

            app.register =
            {
                controller: $controllerProvider.register,
                directive: $compileProvider.directive,
                filter: $filterProvider.register,
                factory: $provide.factory,
                service: $provide.service
            };

            //Define routes - controllers will be loaded dynamically
            var route = routeResolverProvider.route;

            $routeProvider
                .when('/fikasugen', route.resolve('coffeehouse', 'coffeehouses/', 'vm'))
                .otherwise({ redirectTo: '/fikasugen' });

            $locationProvider.html5Mode(true);

        }]);
/*
    app.run(['$rootScope', '$location', 'authService',
        function ($rootScope, $location, authService) {

            //Client-side security. Server-side framework MUST add it's
            //own security as well since client-based security is easily hacked

        }]);*/

    return app;

});
