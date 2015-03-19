/**
 * Created by Tobias on 2015-03-04.
 */
'use strict';
define(['authenticationService', 'components/session/sessionFactory'], function () {
    var loginModule = angular.module('authentication')
        .register.controller('authenticationController', ['$window', '$scope', '$location', 'loggedInService', 'storage',
            'sessionFactory','authService', function ($window, $scope, $location, loggedInService, storage, sessionFactory, authService) {
                console.log(sessionFactory);
                var vm = this;

                vm.login = function(){
                    console.log(vm.username, vm.password);
                    authService.getLoginToken(vm.username, vm.password)
                        .success(function(response){
                            console.log(response);
                            sessionFactory.saveItem(storage.token, response.auth_token);
                            sessionFactory.saveItem(storage.username, vm.username);
                            loggedInService.checkIfLoggedIn();
                            $location.path('/');
                        })
                        .error(function(){
                            vm.loginError = true;
                        })
                }

            }]);
});