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
                return $http.get('http://127.0.0.1:3000/api/v1/coffeehouses?latitude=' + lat + '&longitude=' + long, {
                    headers: {
                        'Authorization': 'Token token='+API.key
                    }
                });
            },

            getCoffeehousesBySearchWord: function(query){
                return $http.get('http://127.0.0.1:3000/api/v1/coffeehouses?search='+query);
            },

            getCoffeehousesByTag: function(tagId){
                return $http.get('http://127.0.0.1:3000/api/v1/tags/' + tagId + '/coffeehouses')
            },

            addCoffeehouse: function(coffeehouse){
                return $http.post('http://127.0.0.1:3000/api/v1/coffeehouses', coffeehouse, {
                    headers: {
                        'Authorization': 'Token token='+API.key,
                        'authtoken': sessionFactory.getItem(storage.token)
                    }
                })
            },

            addTagsToCoffeehouse: function(coffeehouseId, tag){
                return $http.post('http://127.0.0.1:3000/api/v1/coffeehouses/'+ coffeehouseId + '/tags', tag, {
                    headers: {
                        'Authorization': 'Token token='+API.key,
                        'authtoken': sessionFactory.getItem(storage.token)
                    }
                } )
            },

            updateCoffeehouse: function(coffeehouse){
                return $http.put('http://127.0.0.1:3000/api/v1/coffeehouses/' +coffeehouse.id, coffeehouse, {
                    headers: {
                        'Authorization': 'Token token='+API.key,
                        'authtoken': sessionFactory.getItem(storage.token)
                    }
                })
            },

            removeCoffeehouse: function(coffeehouseId){
                return $http.delete('http://127.0.0.1:3000/api/v1/coffeehouses/' + coffeehouseId, {
                    headers: {
                        Authorization: 'Token token='+API.key,
                        'authtoken': sessionFactory.getItem(storage.token)
                    }
                })
            }
        }
    }])
});