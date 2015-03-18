/**
 * Created by Tobias on 2015-03-15.
 */

'use strict';
define([
    'app',
    '../services/coffeehouseService',
    '../services/positionService',
    'components/session/userValue',
    'components/session/sessionFactory'
], function (app) {


    app.register.directive('coffeehouseList', function () {

        var coffeehouseListController = function($scope, $rootScope, $window, positionService, user, storage, sessionFactory, coffeehouseService) {
            var vm = this;
            vm.title = "Caféer i närheten";
            positionService().then(function(pos){
                    //set the users latitude and longitude
                    user.lat = pos.coords.latitude;
                    user.long = pos.coords.longitude;
                },
                //position-error
                function(error){
                    switch(error.code) {
                        case error.PERMISSION_DENIED:
                            vm.positionError = "Du måste tillåta applikation att hämta ut din plats för att" +
                            "kunna visa närliggande caféer. Ingen data kommer att sparas";
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
            ).then(function(){

                    $rootScope.loggedIn = sessionFactory.getItem(storage.token);

                    //get coffeehouses from sessionStorage
                    vm.coffeehouses = sessionFactory.getItem(storage.nearbyCoffeehouses);
                    console.log(vm.coffeehouses);

                    if (vm.coffeehouses === null) {
                        var images = ['1', '2', '3', '4', '5']; //hardcoded names for some images
                        console.log('no data');
                        coffeehouseService.getNearbyCoffeehouses(user.lat, user.long)
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
                });
        };

        coffeehouseListController.$inject = ['$scope','$rootScope', '$window', 'positionService', 'user', 'storage','sessionFactory','coffeehouseService'];

        return{
            restrict: 'E',
            templateUrl: '../templates/coffeehouseList.html',
            controller: coffeehouseListController,
            controllerAs: 'vm'
        }
    });
});