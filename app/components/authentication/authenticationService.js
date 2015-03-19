/**
 * Created by Tobias on 2015-03-04.
 */
"use strict";
define([], function() {
    var loginModule = angular.module('authentication');
    loginModule.register.factory('authService', ['$http', 'API', function ($http, API) {
        return {
            getLoginToken: function (username, password) {
                return $http.get('http://128.199.42.116:3000/api/v1/authenticate', {
                            headers: {
                                'Authorization': API.key,
                                'username': username,
                                'password': password
                            }
                    });
            }
        }

    }]);
});
