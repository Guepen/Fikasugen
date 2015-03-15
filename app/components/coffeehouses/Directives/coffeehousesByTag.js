/**
 * Created by Tobias on 2015-03-15.
 */

/**
 * Created by Tobias on 2015-03-11.
 */
'use strict';
define(['app', 'components/session/sessionFactory', 'components/coffeehouses/services/coffeehouseService'], function (app) {

    //registrera direktivet på modulen fikasugen
    app.register.directive('tags', function(){
        var coffeehouseController = function($routeParams, sessionFactory, coffeehouseService){
            var vm = this;
            console.log($routeParams.tagId);
            coffeehouseService.getCoffeehousesByTag($routeParams.tagId).success(function(data){
                console.log(data);
                vm.coffeehouses = data;
            });

            vm.imageUrl = 'assets/images/1.jpg';
        };

        coffeehouseController.$inject = ['$routeParams', 'sessionFactory', 'coffeehouseService'];
        return{
            restrict: 'E',
            templateUrl: 'components/coffeehouses/Directives/coffeehouseList.html',
            controller: coffeehouseController,
            controllerAs: 'vm'
        }
    })
});