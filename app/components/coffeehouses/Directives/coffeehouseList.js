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
            positionService().then(function(pos){
                    console.log(pos);
                    user.lat = pos.coords.latitude;
                    user.long = pos.coords.longitude;
                },
                function(error){
                    console.log(error);
                }
            ).then(function(){

                    vm.tags = [];
                    vm.imageUrl = 'assets/images/1.jpg';
                    $rootScope.loggedIn = sessionFactory.getItem(storage.token);
                    vm.coffeehouses = sessionFactory.getItem(storage.nearbyCoffeehouses);
                    console.log(vm.coffeehouses);


                    if (vm.coffeehouses === null) {
                        console.log('no data');
                        coffeehouseService.getNearbyCoffeehouses(user.lat, user.long)
                            .success(function (data) {
                                vm.coffeehouses = data;
                                sessionFactory.saveItem(storage.nearbyCoffeehouses, data);
                                console.log(vm.coffeehouses);

                            });
                    }
                });


            vm.logout = function () {
                $window.alert('erds');
            }
        };

        coffeehouseListController.$inject = ['$scope','$rootScope', '$window', 'positionService', 'user', 'storage','sessionFactory','coffeehouseService'];

        return{
            restrict: 'E',
            templateUrl: 'components/coffeehouses/Directives/coffeehouseList.html',
            controller: coffeehouseListController,
            controllerAs: 'vm'
        }
    });
});