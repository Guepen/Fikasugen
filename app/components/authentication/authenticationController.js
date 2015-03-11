/**
 * Created by Tobias on 2015-03-04.
 */
'use strict';
define(['components/authentication/authenticationService', 'components/authentication/sessionFactory'], function () {
    var loginModule = angular.module('login')
        .register.controller('authenticationController', ['$window','sessionFactory','authService',
            function ($window, sessionFactory, authService) {
                console.log(sessionFactory);
                var vm = this;
                vm.hello = "Hello authenticate";

                vm.login = function(){

                    authService.getLoginToken(vm.username, vm.password)
                        .success(function(response){
                            console.log(response);
                            sessionFactory.saveSession('token', response.auth_token)
                        })
                        .error(function(){
                            vm.loginError = true;
                        })




                }

            }]);
});