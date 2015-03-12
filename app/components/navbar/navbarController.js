/**
 * Created by Tobias on 2015-03-04.
 */
'use strict';
define(['app', 'components/session/sessionFactory'], function (app) {

    app.register.controller('navbarController', ['$rootScope', 'sessionFactory', function($rootScope, sessionFactory){
        var vm = this;
        vm.token = sessionFactory.getItem('token');

        if(vm.token){
            $rootScope.loggedIn = true;
        }
    }])
});