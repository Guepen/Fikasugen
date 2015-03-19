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
    'components/coffeehouses/services/coffeehouseService'
], function (app) {

    //registrera direktivet på modulen fikasugen
    app.register.directive('newCoffeehouse', function(){
        var coffeehouseController = function($rootScope, $location, sessionFactory, coffeehouseService, storage){
            var vm = this;


            vm.coffeehouse = {tags_attributes: []};
            $rootScope.loggedIn = sessionFactory.getItem(storage.token);

            vm.addCoffeehouse = function(){
                console.log(vm.tags);
                if (vm.tags !== undefined) {
                    var tags = vm.tags.split(',');
                    tags.forEach(function (tag) {
                        vm.coffeehouse.tags_attributes.push({name: tag.trim()})
                    });
                }
                console.log(vm.coffeehouse, vm.tags);
                coffeehouseService.addCoffeehouse(vm.coffeehouse).success(function(data){
                    console.log(data);
                    var images = ['1', '2', '3', '4', '5']; //hardcoded names for some images
                    var randomElement = Math.floor(Math.random() * images.length);
                    data.imageUrl = images[randomElement];
                    var coffeehouses = sessionFactory.getItem(storage.nearbyCoffeehouses);
                    console.log(data);
                    coffeehouses.push(data);
                    sessionFactory.saveItem(storage.nearbyCoffeehouses, coffeehouses);
                    $location.path('/');

                })
            }
        };

        coffeehouseController.$inject = ['$rootScope', '$location', 'sessionFactory', 'coffeehouseService', 'storage' ];
        return{
            restrict: 'E',
            templateUrl: '../templates/newCoffeehouse.html',
            controller: coffeehouseController,
            controllerAs: 'vm'
        }
    })
});