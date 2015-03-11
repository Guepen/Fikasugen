/**
 * Created by Tobias on 2015-03-11.
 */

"use strict";
define([], function() {
    var loginModule = angular.module('login');
    loginModule.register.factory('sessionFactory', ['$window', function ($window) {
        return {
            saveItem: function(key, value){
                $window.sessionStorage.setItem(key, JSON.stringify(value));
            },
            getItem: function(key){
              return JSON.parse($window.sessionStorage.getItem(key));
            },
            deleteItem: function(key){
                $window.sessionStorage.removeItem(key);
            }
        };

    }]);
});

