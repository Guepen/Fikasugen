/**
 * Created by Tobias on 2015-03-12.
 */
/**
 * Created by Tobias on 2015-03-11.
 */
'use strict';
define(['app', 'components/session/sessionFactory', 'components/coffeehouses/services/coffeehouseService'], function (app) {

    //registrera direktivet på modulen fikasugen
    app.register.directive('newCoffeehouse', function(){
            var coffeehouseController = function($rootScope, sessionFactory, coffeehouseService, storage){
                var vm = this;
                vm.coffeehouse = {tags: []};
                $rootScope.loggedIn = sessionFactory.getItem(storage.token);

                vm.addCoffeehouse = function(){
                    vm.coffeehouse.tags = vm.tags.split(',');
                    console.log(vm.coffeehouse, vm.tags);
                    coffeehouseService.addCoffeehouse(vm.coffeehouse);
                }
            };

            coffeehouseController.$inject = ['$rootScope', 'sessionFactory', 'coffeehouseService', 'storage' ];
            return{
                restrict: 'E',
                templateUrl: 'components/coffeehouses/Directives/newCoffeehouse.html',
                controller: coffeehouseController,
                controllerAs: 'vm'
            }
        })
});