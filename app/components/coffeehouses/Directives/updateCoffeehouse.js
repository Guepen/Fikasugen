/**
 * Created by Tobias on 2015-03-16.
 */

/**
 * Created by Tobias on 2015-03-12.
 */

'use strict';
define([
    'app',
    'components/session/sessionFactory',
    'components/coffeehouses/services/coffeehouseService',
    'components/session/userValue',
    'components/authentication/services/creatorValue'
], function (app) {

    //registrera direktivet på modulen fikasugen
    app.register.directive('updateCoffeehouse', function(){
        var coffeehouseController = function($rootScope, $routeParams, $location, user, creator, sessionFactory, coffeehouseService, storage){
            var vm = this;
            console.log(user);
            $rootScope.loggedIn = sessionFactory.getItem(storage.token);
            var coffeehouseList = sessionFactory.getItem(storage.nearbyCoffeehouses);

            coffeehouseList.forEach(function(coffeehouse){
                if(coffeehouse.id == $routeParams.id){
                    vm.coffeehouse = coffeehouse;
                    var tags = [];
                    coffeehouse.tags.forEach(function(tag){
                        tags.push(tag.name);
                    });
                    vm.tags = tags.join(", ");
                }
            });

            vm.addCoffeehouse = function(){
                vm.coffeehouse.tags_attributes = [];
                delete vm.coffeehouse.tags;
                console.log(vm.coffeehouse);
                var tags = vm.tags.split(',');
                tags.forEach(function(tag){
                    vm.coffeehouse.tags_attributes.push({name: tag.trim()})
                });
                console.log(vm.coffeehouse, vm.tags);
                coffeehouseService.updateCoffeehouse(vm.coffeehouse).success(function(data){
                    console.log(data);
                    if(user.lat !== undefined || user.long !== undefined) {
                        coffeehouseService.getNearbyCoffeehouses(user.lat, user.long).success(function(data){
                            console.log(data.length);
                            sessionFactory.saveItem(storage.nearbyCoffeehouses, data);
                            $location.path("/coffeehouse/"+ $routeParams.id);
                        })

                    }

                })
            }
        };

        coffeehouseController.$inject = ['$rootScope', '$routeParams', '$location', 'user', 'creator', 'sessionFactory', 'coffeehouseService', 'storage' ];
        return{
            restrict: 'E',
            templateUrl: 'components/coffeehouses/Directives/newCoffeehouse.html',
            controller: coffeehouseController,
            controllerAs: 'vm'
        }
    })
});