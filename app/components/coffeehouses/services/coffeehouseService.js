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
                return $http.get('http://127.0.0.1:3000/api/v1/coffeehouses?latitude=' + lat + '&longitude=' + long);
            },

            getCoffeehousesBySearchWord: function(query){
                return $http.get('http://127.0.0.1:3000/api/v1/coffeehouses?search='+query);
            },

            getCoffeehousesByTag: function(tagId){
              return $http.get('http://127.0.0.1:3000/api/v1/tags/' + tagId + '/coffeehouses')
            },

            addCoffeehouse: function(coffeehouse){
                return $http.post('http://127.0.0.1:3000/api/v1/coffeehouses', coffeehouse)
            }
        }
    }])
});