/**
 * Created by Tobias on 2015-03-04.
 */
'use strict';
define(['app', 'coffeehouseService', 'components/session/sessionFactory'], function (app) {


    app.register.controller('coffeehouseListController', ['$scope','$window','sessionFactory','coffeehouseService',
        function ($scope, $window, sessionFactory, coffeehouseService) {
            console.log(coffeehouseService);
            var vm = this;
            $window.navigator.geolocation.getCurrentPosition(
                function setPosition(position){
                    vm.coffeehouses = sessionFactory.getItem('nearbyCoffeehouses');
                    console.log(vm.coffeehouses);
                    if(vm.coffeehouses === null) {
                        console.log('no data');
                        coffeehouseService.getNearbyCoffeehouses(position.coords.latitude, position.coords.longitude)
                            .success(function (data) {
                                vm.coffeehouses = data;
                                sessionFactory.saveItem('nearbyCoffeehouses', data);

                            });
                    } else{
                        $scope.$apply();
                    }
                },

                //if the user doesnt allow to share position
                function showError(error) {
                    vm.positionError = true;
                    switch(error.code) {
                        case error.PERMISSION_DENIED:
                            vm.errorMsg = "Du måste tillåta applikationen att använda din position för att hämta ut närliggande caféer";
                            break;
                        case error.POSITION_UNAVAILABLE:
                            vm.errorMsg = "Location information is unavailable.";
                            break;
                        case error.TIMEOUT:
                            vm.errorMsg = "The request to get user location timed out.";
                            break;
                        case error.UNKNOWN_ERROR:
                            vm.errorMsg = "An unknown error occurred.";
                            break;
                    }
                    $scope.$apply();
                });



        }]);
});