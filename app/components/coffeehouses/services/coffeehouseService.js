/**
 * Created by Tobias on 2015-03-11.
 */
'use strict';
define(['app'], function (app) {
    app.register.factory('coffeehouseService', ['$http', 'sessionFactory', 'storage', 'API', function($http, sessionFactory, storage, API){
        return {
            getAllCoffeehouses: function(){
                return $http.get('http://127.0.0.1:3000/api/v1/coffeehouses');
            },
            getNearbyCoffeehouses: function(lat, long){
                return $http.get(API.baseUrl + 'coffeehouses?latitude=' + lat + '&longitude=' + long, {
                    headers: {
                        'Authorization': API.key
                    }
                });
            },

            getCoffeehousesBySearchWord: function(query){
                return $http.get(API.baseUrl + 'coffeehouses?search='+query);
            },

            getCoffeehousesByTag: function(tagId){
                return $http.get(API.baseUrl + 'tags/' + tagId + '/coffeehouses', {
                    headers: {
                        'Authorization': API.key
                    }
            })
        },

            addCoffeehouse: function(coffeehouse){
            return $http.post(API.baseUrl + 'coffeehouses', coffeehouse, {
                headers: {
                    'Authorization': API.key,
                    'authtoken': sessionFactory.getItem(storage.token)
                }
            })
        },

        addTagsToCoffeehouse: function(coffeehouseId, tag){
            return $http.post(API.baseUrl + 'coffeehouses/'+ coffeehouseId + '/tags', tag, {
                headers: {
                    'Authorization': API.key,
                    'authtoken': sessionFactory.getItem(storage.token)
                }
            } )
        },

        updateCoffeehouse: function(coffeehouse){
            return $http.put(API.baseUrl +'coffeehouses/' +coffeehouse.id, coffeehouse, {
                headers: {
                    'Authorization': API.key,
                    'authtoken': sessionFactory.getItem(storage.token)
                }
            })
        },

        removeCoffeehouse: function(coffeehouseId){
            return $http.delete(API.baseUrl +'coffeehouses/' + coffeehouseId, {
                headers: {
                    Authorization: API.key,
                    'authtoken': sessionFactory.getItem(storage.token)
                }
            })
        }
    }
}])
});