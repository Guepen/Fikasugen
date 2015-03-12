/**
 * Created by Tobias on 2015-03-12.
 */
/**
 * Created by Tobias on 2015-03-11.
 */
'use strict';
define(['app', 'components/session/sessionFactory'], function (app) {

    //registrera direktivet på modulen fikasugen
    app.register.directive('newCoffeehouse',['$rootScope', 'storage', function($rootScope, storage){
        var coffeehouseController = function(sessionFactory){
            var vm = this;
            vm.coffeehouse = {tags: []};
            $rootScope.loggedIn = sessionFactory.getItem(storage.token);

            vm.addCoffeehouse = function(){
                vm.coffeehouse.tags = vm.tags.split(',');
                console.log(vm.coffeehouse, vm.tags);

            }
        };

        coffeehouseController.$inject = ['sessionFactory'];
        return{
            restrict: 'E',
            templateUrl: 'components/coffeehouses/Directives/newCoffeehouse.html',
            controller: coffeehouseController,
            controllerAs: 'vm'
        }
    }])
});