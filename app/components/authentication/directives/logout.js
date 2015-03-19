/**
 * Created by Tobias on 2015-03-17.
 */

'use strict';
define([
    'app',
    'modules/login',
    'components/session/sessionFactory'
], function () {

    var authentication = angular.module('authentication');


    authentication.register.directive('logout', function() {
        var logoutController = function($rootScope, loggedInService, sessionFactory, storage){
            console.log($rootScope);
            sessionFactory.deleteItem(storage.token);
            sessionFactory.deleteItem(storage.username);
            loggedInService.checkIfLoggedIn();
        };

        logoutController.$inject = ['$rootScope', 'loggedInService', 'sessionFactory', 'storage'];

        return{
            restrict: 'E',
            templateUrl: 'components/authentication/templates/logout.html',
            controller: logoutController,
            controllerAs: 'vm'
        }
    });
});