/**
 * Created by Tobias on 2015-03-04.
 */
'use strict';
define(['app', '../services/coffeehouseService', 'components/session/sessionFactory'], function (app) {


    app.register.controller('coffeehouseListController', ['$scope', '$rootScope', '$window', 'storage','sessionFactory','coffeehouseService',
        function ($scope, $rootScope, $window, storage, sessionFactory, coffeehouseService) {
            console.log(coffeehouseService);
            var vm = this;
            vm.tags = [];
            $rootScope.loggedIn = sessionFactory.getItem(storage.token);
            $window.navigator.geolocation.getCurrentPosition(
                function setPosition(position){
                    vm.coffeehouses = sessionFactory.getItem(storage.nearbyCoffeehouses);
                    console.log(vm.coffeehouses);
                    if(vm.coffeehouses === null) {
                        console.log('no data');
                        coffeehouseService.getNearbyCoffeehouses(position.coords.latitude, position.coords.longitude)
                            .success(function (data) {
                                vm.coffeehouses = data;
                                sessionFactory.saveItem(storage.nearbyCoffeehouses, data);

                            });
                    }

                    vm.coffeehouses.forEach(function(coffeehouse){
                        coffeehouse.tags.forEach(function(tag){
                            vm.tags.push(tag);
                        })
                    });

                    $scope.$apply();
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