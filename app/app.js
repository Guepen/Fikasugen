'use strict';

define([], function () {

    var app = angular.module('fikasugen', [
        'ngRoute',
        'authentication',
        'ngMap',
        'session',
        'nav',
        'loggedIn'
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
                service: $provide.service,
                value: $provide.value
            };

            //Define routes - controllers will be loaded dynamically
            $routeProvider

                .when('/', {
                    templateUrl: 'components/coffeehouses/views/coffeehouseList.html',
                    resolve: {coffeehouseController: function($q){
                        var deferred = $q.defer();
                        require(['components/coffeehouses/Directives/coffeehouseList',
                            'components/navbar/navbarController'],function(){
                            deferred.resolve();
                        });
                        return deferred.promise;
                    }}
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

                .when('/tags/:tagId/coffeehouses', {
                    templateUrl: 'components/coffeehouses/views/tag-coffeehouses.html',
                    resolve: {coffeehouseController: function($q){
                        var deferred = $q.defer();
                        require(['components/coffeehouses/Directives/coffeehousesByTag'],function(){
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
                .when('/coffeehouse/:id/update', {
                    templateUrl: 'components/coffeehouses/views/updateCoffeehouse.html',
                    resolve: {coffeehouseController: function($q){
                        var deferred = $q.defer();
                        require(['components/coffeehouses/Directives/updateCoffeehouse'],function(){
                            deferred.resolve();
                        });
                        return deferred.promise;
                    }}
                })
                .when('/login',{
                    templateUrl: 'components/authentication/authenticationView.html',
                    resolve: {coffeehouseController: function($q){
                        var deferred = $q.defer();
                        require(['components/authentication/directives/logout','components/authentication/authenticationController'],function(){
                            deferred.resolve();
                        });
                        return deferred.promise;
                    }},
                    controller: 'authenticationController',
                    controllerAs: 'authenticate'
                })

                .when('/logout',{
                    templateUrl: 'components/authentication/views/logoutView.html',
                    resolve: {coffeehouseController: function($q){
                        var deferred = $q.defer();
                        require(['components/authentication/directives/logout'],function(){
                            deferred.resolve();
                        });
                        return deferred.promise;
                    }}
                })

                .otherwise({ redirectTo: '/' });

            $locationProvider.html5Mode({requireBase:true, enabled: true});

        }]);


    app.run(['$rootScope', '$location',function($rootScope, $location){
        var loggedIn = false;

        $rootScope.$on('loggedIn', function(e, token){
            if(token){
                console.log("hwh");
                loggedIn = true;
                $rootScope.justLoggedIn = true;
                $rootScope.loggedIn = true;
            }
        });
        $rootScope.$on('$routeChangeStart', function(event, next, current){
            console.log(loggedIn);
           if($location.path() !== '/'){
               $rootScope.justLoggedIn = false;
           }
            if($location.path() === '/logout' && loggedIn === false ||
                $location.path() === '/logout' && loggedIn === null){

                $location.path('/');
            }
        } )
    }]);


    app.constant('API',{
        'key': 'Token token=4a4906f45f647e5e78e3e3621a39d50344ac7e843e86adc88e',
        'baseUrl': 'http://127.0.0.1:3000/api/v1/'
    });


    app.constant('storage',{
        'nearbyCoffeehouses': 'nearbyCoffeehouses',
        'token': 'token',
        'username': 'username'
    });

    return app;

});