/**
 * Created by Tobias on 2015-03-11.
 */
'use strict';
define(['app'], function (app) {
    app.register.factory('coffeehouseService', ['$http', function($http){
        return {
            getAllCoffeehouses: function(){
                return $http.get('http://127.0.0.1:3000/api/v1/coffeehouses');
            },
            getNearbyCoffeehouses: function(lat, long){
                return $http.get('http://127.0.0.1:3000/api/v1/coffeehouses?latitude=' + lat + '&longitude=' + long)
            }
        }
    }])
});