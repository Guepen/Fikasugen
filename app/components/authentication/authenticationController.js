/**
 * Created by Tobias on 2015-03-04.
 */
'use strict';
define(['authenticationService', 'components/session/sessionFactory'], function () {
    var loginModule = angular.module('authentication')
        .register.controller('authenticationController', ['$window', '$rootScope', '$location', 'storage',
            'sessionFactory','authService', function ($window, $rootScope, $location, storage, sessionFactory, authService) {
                console.log(sessionFactory);
                var vm = this;
                vm.hello = "Hello authenticate";

                vm.login = function(){

                    authService.getLoginToken(vm.username, vm.password)
                        .success(function(response){
                            console.log(response);
                            sessionFactory.saveItem(storage.token, response.auth_token);
                            sessionFactory.saveItem(storage.username, vm.username);
                            $rootScope.loggedIn = response.auth_token;
                            $rootScope.justLoggedIn = true;
                            $location.path('/');
                        })
                        .error(function(){
                            vm.loginError = true;
                        })




                }

            }]);
});