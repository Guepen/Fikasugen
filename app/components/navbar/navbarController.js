/**
 * Created by Tobias on 2015-03-04.
 */
'use strict';
define(['app', 'components/session/sessionFactory'], function (app) {

    app.register.controller('navbarController', ['$rootScope', 'storage', 'sessionFactory', function($rootScope, storage, sessionFactory){
        var vm = this;
        vm.token = sessionFactory.getItem(storage.token);


        if(vm.token){
            $rootScope.loggedIn = true;
        }

        vm.logOut = function(){
            alert("htrgfd");
        }
    }])
});