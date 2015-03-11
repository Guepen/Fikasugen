/**
 * Created by Tobias on 2015-03-04.
 */
"use strict";
define([], function() {
    var loginModule = angular.module('login');
    loginModule.register.factory('authService', ['$http', function ($http) {
        return {
            getLoginToken: function (username, password) {
                return $http.get('http://localhost:3000/api/v1/authenticate', {
                            headers: {
                                'Authorization': 'Token token=fe593bd24fc5741ced3ae48b504a5c36a09af3d9e67dd24cc6',
                                'username': username,
                                'password': password
                            }
                        
                    });

            }
        }


    }]);
});
