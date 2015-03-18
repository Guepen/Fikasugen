/**
 * Created by Tobias on 2015-03-15.
 */

/**
 * Created by Tobias on 2015-03-11.
 */
'use strict';
define(['app', 'components/session/sessionFactory', 'components/coffeehouses/services/coffeehouseService'], function (app) {

    //registrera direktivet på modulen fikasugen
    app.register.directive('tagCoffeehouses', function(){
        var coffeehouseController = function($routeParams, sessionFactory, coffeehouseService){
            var vm = this;

            console.log($routeParams.tagId);
            coffeehouseService.getCoffeehousesByTag($routeParams.tagId).success(function(data){
                console.log(data);
                data[0].tags.forEach(function(tag){
                    console.log(tag);
                    if(tag.id == $routeParams.tagId){
                        vm.title = "Caféer med taggen "+ tag.name;
                    }
                });

                vm.coffeehouses = data;
            });

        };

        coffeehouseController.$inject = ['$routeParams', 'sessionFactory', 'coffeehouseService'];
        return{
            restrict: 'E',
            templateUrl: '../templates/coffeehouseList.html',
            controller: coffeehouseController,
            controllerAs: 'vm'
        }
    })
});