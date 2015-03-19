/**
 * Created by Tobias on 2015-03-19.
 */

"use strict";
define(['components/session/sessionFactory'], function() {
    var loginModule = angular.module('loggedIn', []);
    loginModule.factory('loggedInService', ['$rootScope','sessionFactory', 'storage', function ($rootScope, sessionFactory, storage) {
        return {
            checkIfLoggedIn: function(){
                //all controller can listen to this broadcast
                $rootScope.$broadcast('loggedIn',
                    {
                        token: sessionFactory.getItem(storage.token),
                        username: sessionFactory.getItem(storage.username)
                    })
            }
        }

    }]);
});
