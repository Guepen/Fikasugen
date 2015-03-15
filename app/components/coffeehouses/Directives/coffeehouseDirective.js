/**
 * Created by Tobias on 2015-03-11.
 */
'use strict';
define(['app', 'components/session/sessionFactory'], function (app) {

    //registrera direktivet på modulen fikasugen
    app.register.directive('coffeehouse', function(){
        var coffeehouseController = function($routeParams, sessionFactory, storage){
            var vm = this;
            console.log($routeParams.id);
            var coffeehouses = sessionFactory.getItem('nearbyCoffeehouses');
            coffeehouses.forEach(function(coffeehouse){
                if(coffeehouse.id == $routeParams.id){
                    vm.coffeehouse = coffeehouse;
                    vm.creator = (coffeehouse.creator.username == sessionFactory.getItem(storage.username));
                    console.log(vm.creator);
                }
            });

            vm.imageUrl = 'assets/images/1.jpg';
        };

        coffeehouseController.$inject = ['$routeParams', 'sessionFactory', 'storage'];
        return{
            restrict: 'E',
            templateUrl: 'components/coffeehouses/Directives/coffeehouse.html',
            controller: coffeehouseController,
            controllerAs: 'vm'
        }
    })
});