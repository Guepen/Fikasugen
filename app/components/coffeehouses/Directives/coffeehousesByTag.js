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
                //find the name of the tag
                data[0].tags.forEach(function(tag){
                    console.log(tag);
                    if(tag.id == $routeParams.tagId){
                        vm.title = "Caféer med taggen "+ tag.name;
                    }
                });
                var images = ['1', '2', '3', '4', '5']; //hardcoded names for some images

                vm.coffeehouses = data;

                vm.coffeehouses.forEach(function(coffeehouse){
                    var randomElement = Math.floor(Math.random() * images.length);
                    coffeehouse.imageUrl = images[randomElement];
                    //if there are more images than coffeehouses
                    if(vm.coffeehouses.length <= images.length){
                        images.splice(randomElement, 1);  // remove the image from the array
                    }
                });
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