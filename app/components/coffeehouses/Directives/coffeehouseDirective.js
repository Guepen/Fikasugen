/**
 * Created by Tobias on 2015-03-11.
 */
'use strict';
define(['app', 'components/session/sessionFactory'], function (app) {

    //registrera direktivet på modulen fikasugen
    app.register.directive('coffeehouse', function(){
        var coffeehouseController = function($routeParams, sessionFactory){
            var vm = this;
            console.log($routeParams.id);
            var coffeehouses = sessionFactory.getItem('nearbyCoffeehouses');
            coffeehouses.forEach(function(coffeehouse){
                if(coffeehouse.id == $routeParams.id){
                    vm.coffeehouse = coffeehouse;
                    console.log(coffeehouse);
                }
            })
        };

        coffeehouseController.$inject = ['$routeParams', 'sessionFactory'];
        return{
            restrict: 'E',
            templateUrl: 'components/coffeehouses/Directives/coffeehouse.html',
            controller: coffeehouseController,
            controllerAs: 'vm'
        }
    })
});