'use strict';

define([], function () {

    var app = angular.module('fikasugen', [
        'ngRoute',
        'login',
        'ngMap'
    ]);

    app.config(['$routeProvider', '$controllerProvider','$httpProvider',
        '$compileProvider', '$filterProvider', '$provide', '$locationProvider',

        function ($routeProvider, $controllerProvider,$httpProvider,
                  $compileProvider, $filterProvider, $provide, $locationProvider) {
            $httpProvider.defaults.headers.post = {'Content-type': 'application/json'};

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
                    templateUrl: 'components/coffeehouses/views/coffeehouseList.html',
                    resolve: {coffeehouseController: function($q){
                        var deferred = $q.defer();
                        require(['components/coffeehouses/controllers/coffeehouseListCtrl',
                            'components/navbar/navbarController'],function(){
                            deferred.resolve();
                        });
                        return deferred.promise;
                    }},
                    controller: 'coffeehouseListController',
                    controllerAs: 'coffeehouseList'
                })
                .when('/coffeehouse/:id',{
                    templateUrl: 'components/coffeehouses/views/coffeehouseView.html',
                    resolve: {coffeehouseController: function($q){
                        var deferred = $q.defer();
                        require(['components/coffeehouses/Directives/coffeehouseDirective'],function(){
                            deferred.resolve();
                        });
                        return deferred.promise;
                    }}

                })

                .when('/newCoffeehouse',{
                    templateUrl: 'components/coffeehouses/views/newCoffeehouse.html',
                    resolve: {coffeehouseController: function($q){
                        var deferred = $q.defer();
                        require(['components/coffeehouses/Directives/newCoffeehouseDirective'],function(){
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

            $locationProvider.html5Mode({requireBase:true, enabled: true});

        }]);

    app.constant('API',{
       'key': 'fe593bd24fc5741ced3ae48b504a5c36a09af3d9e67dd24cc6'
    });

    app.constant('storage',{
        'nearbyCoffeehouses': 'nearbyCoffeehouses',
        'token': 'token'
    });


    return app;

});