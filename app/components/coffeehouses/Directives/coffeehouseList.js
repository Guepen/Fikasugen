/**
 * Created by Tobias on 2015-03-15.
 */

'use strict';
define([
    'app',
    '../services/coffeehouseService',
    '../services/positionService',
    'components/session/sessionFactory'
], function (app) {


    app.register.directive('coffeehouseList', function () {

        var coffeehouseListController = function($scope, $rootScope, $window, loggedInService, positionService,storage, sessionFactory, coffeehouseService) {
            var vm = this;
            loggedInService.checkIfLoggedIn();
            vm.title = "Caféer i närheten";
            positionService().then(function(pos){
                    //set the users latitude and longitude
                    vm.coffeehouses = sessionFactory.getItem(storage.nearbyCoffeehouses);
                    console.log(vm.coffeehouses);

                    if (vm.coffeehouses === null) {
                        var images = ['1', '2', '3', '4', '5']; //hardcoded names for some images

                        console.log('no data');
                        coffeehouseService.getNearbyCoffeehouses(pos.coords.latitude, pos.coords.longitude)
                            .success(function (data) {
                                vm.coffeehouses = data;
                                vm.coffeehouses.forEach(function(coffeehouse){
                                    var randomElement = Math.floor(Math.random() * images.length);
                                    coffeehouse.imageUrl = images[randomElement];
                                    //if there are more images than coffeehouses
                                    if(vm.coffeehouses.length <= images.length){
                                        images.splice(randomElement, 1);  // remove the image from the array
                                    }
                                });
                                if (data.length > 0) {
                                    sessionFactory.saveItem(storage.nearbyCoffeehouses, data);
                                }
                                console.log(vm.coffeehouses);

                            });
                    }
                },
                //position-error
                function(error){
                    switch(error.code) {
                        case error.PERMISSION_DENIED:
                            vm.positionError = "Du måste tillåta applikation att hämta ut din plats för att " +
                            "kunna visa närliggande caféer. Ingen data om din plats kommer att sparas";
                            break;
                        case error.POSITION_UNAVAILABLE:
                            vm.positionError = "Ett fel inträffade när din position skulle hämtas";
                            break;
                        case error.TIMEOUT:
                            vm.positionError = "Kunde inte fastställa din position. Förök igen!";
                            break;
                        case error.UNKNOWN_ERROR:
                            vm.positionError = "Ett oväntat fel inträffade när din position skulle hämtas";
                            break;
                    }
                }
                //when position is located
            )
        };

        coffeehouseListController.$inject = ['$scope','$rootScope', '$window', 'loggedInService', 'positionService', 'storage','sessionFactory','coffeehouseService'];

        return{
            restrict: 'E',
            templateUrl: '../templates/coffeehouseList.html',
            controller: coffeehouseListController,
            controllerAs: 'vm'
        }
    });
});