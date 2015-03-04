'use strict';

define([], function () {

    var app = angular.module('fikasugen', ['ngRoute']);

    app.config(['$routeProvider', '$controllerProvider',
        '$compileProvider', '$filterProvider', '$provide', '$locationProvider',

        function ($routeProvider, $controllerProvider,
                  $compileProvider, $filterProvider, $provide, $locationProvider) {

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
                    templateUrl: '../components/coffeehouses/coffeehouseView.html',
                    controller: 'coffeehouseController',
                    resolve: {coffeehouseController: function($q){
                        var deferred = $q.defer();
                        require(['../components/coffeehouses/coffeehouseController'],function(){
                            deferred.resolve();
                        });
                        return deferred.promise;
                    }}
                })
                .when('/login',{
                    templateUrl: '../components/authentication/authenticationView.html',
                    controller: 'authenticationController',
                    resolve: {coffeehouseController: function($q){
                        var deferred = $q.defer();
                        require(['../components/authentication/authenticationController'],function(){
                            deferred.resolve();
                        });
                        return deferred.promise;
                    }}
                })
                //.when('/login', route.resolve('authentication', 'authentication/', 'vm'))
                .otherwise({ redirectTo: '/' });

            $locationProvider.html5Mode(true);

        }]);


    return app;

});
