'use strict';

define([], function () {

    var app = angular.module('fikasugen', [
        'ngRoute',
        'login'
    ]);

    app.config(['$routeProvider', '$controllerProvider','$httpProvider',
        '$compileProvider', '$filterProvider', '$provide', '$locationProvider',

        function ($routeProvider, $controllerProvider,$httpProvider,
                  $compileProvider, $filterProvider, $provide, $locationProvider) {
            $httpProvider.defaults.useXDomain = true;
            delete $httpProvider.defaults.headers.common['X-Requested-With'];

            //used for register resources dynamically
            app.register =
            {
                controller: $controllerProvider.register,
                directive: $compileProvider.directive,
                filter: $filterProvider.register,
                factory: $provide.factory,
                service: $provide.service
            };

            //Define routes - controllers will be loaded dynamically
            $routeProvider

                .when('/', {
                    templateUrl: 'components/coffeehouses/coffeehouseView.html',
                    controller: 'coffeehouseController',
                    resolve: {coffeehouseController: function($q){
                        var deferred = $q.defer();
                        require(['components/coffeehouses/coffeehouseController'],function(){
                            deferred.resolve();
                        });
                        return deferred.promise;
                    }}
                })
                .when('/login',{
                    templateUrl: 'components/authentication/authenticationView.html',
                    resolve: {coffeehouseController: function($q){
                        var deferred = $q.defer();
                        require(['components/authentication/authenticationController'],function(){
                            deferred.resolve();
                        });
                        return deferred.promise;
                    }},
                    controller: 'authenticationController',
                    controllerAs: 'authenticate'
                })
                //.when('/login', route.resolve('authentication', 'authentication/', 'vm'))
                .otherwise({ redirectTo: '/' });

            $locationProvider.html5Mode({requireBase:false, enabled: true});

        }]);


    return app;

});