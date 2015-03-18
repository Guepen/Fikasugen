/**
 * Created by Tobias on 2015-03-12.
 */
/**
 * Created by Tobias on 2015-03-11.
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
    app.register.directive('newCoffeehouse', function(){
        var coffeehouseController = function($rootScope, $location, user, creator, sessionFactory, coffeehouseService, storage){
            var vm = this;
            console.log(user);

            vm.coffeehouse = {tags_attributes: []};
            $rootScope.loggedIn = sessionFactory.getItem(storage.token);

            vm.addCoffeehouse = function(){
                console.log(vm.tags);
                var tags = vm.tags.split(',');
                tags.forEach(function(tag){
                    vm.coffeehouse.tags_attributes.push({name: tag.trim()})
                });
                console.log(vm.coffeehouse, vm.tags);
                coffeehouseService.addCoffeehouse(vm.coffeehouse).success(function(data){
                    console.log(data);
                    if(user.lat !== undefined || user.long !== undefined) {
                        coffeehouseService.getNearbyCoffeehouses(user.lat, user.long).success(function(data){
                            console.log(data.length);
                            sessionFactory.saveItem(storage.nearbyCoffeehouses, data);
                        })
                    }
                    $location.path('/');

                })
            }
        };

        coffeehouseController.$inject = ['$rootScope', '$location', 'user', 'creator', 'sessionFactory', 'coffeehouseService', 'storage' ];
        return{
            restrict: 'E',
            templateUrl: '../templates/newCoffeehouse.html',
            controller: coffeehouseController,
            controllerAs: 'vm'
        }
    })
});