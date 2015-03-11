/**
 * Created by Tobias on 2015-03-11.
 */

"use strict";
define([], function() {
    var loginModule = angular.module('login');
    loginModule.register.factory('sessionFactory', ['$window', function ($window) {
        return {
            saveSession: function(key, value){
                $window.sessionStorage.setItem(key, value);
            },
            deleteSession: function(key){
                $window.sessionStorage.removeItem(key);
            }
        };

    }]);
});

