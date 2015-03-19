/**
 * Created by Tobias on 2015-03-11.
 */
'use strict';
define(['app', 'components/coffeehouses/services/coffeehouseService', 'components/session/sessionFactory'], function (app) {

    //registrera direktivet på modulen fikasugen
    app.register.directive('coffeehouse', function(){
        var coffeehouseController = function($routeParams, $location, $scope, $rootScope, loggedInService, sessionFactory, storage, coffeehouseService){
            var vm = this;
            loggedInService.checkIfLoggedIn();

            $rootScope.$on('loggedIn', function(e, data){
                $scope.loggedIn = data.token;
                console.log($scope.loggedIn);

            });
            var coffeehouses = sessionFactory.getItem(storage.nearbyCoffeehouses);
            coffeehouses.forEach(function(coffeehouse){
                if(coffeehouse.id == $routeParams.id){
                    vm.coffeehouse = coffeehouse;
                    vm.creator = (coffeehouse.creator.username == sessionFactory.getItem(storage.username));
                    console.log(vm.creator);
                }


            });

            vm.deleteCoffeehouse = function(){
                coffeehouseService.removeCoffeehouse($routeParams.id).success(function(){
                    var coffeehouseList = sessionFactory.getItem(storage.nearbyCoffeehouses);

                    for(var i = 0; i < coffeehouseList.length; i++){
                        console.log(coffeehouseList[i].id, $routeParams.id);
                        if(coffeehouseList[i].id == $routeParams.id){
                            coffeehouseList.splice(i, 1);
                        }
                    }
                    sessionFactory.saveItem(storage.nearbyCoffeehouses, coffeehouseList);
                    $location.path('/');
                })
            };

            vm.addTags = function(){
                var newTag = {'name': vm.newTag};
                coffeehouseService.addTagsToCoffeehouse($routeParams.id, newTag).success(function(response){
                    vm.coffeehouse.tags.push(response);
                    var coffeehouseList = sessionFactory.getItem(storage.nearbyCoffeehouses);
                    coffeehouseList.forEach(function(coffeehouse){
                        if(coffeehouse.id == $routeParams.id){
                            coffeehouse.tags.push(response);
                        }
                    });

                    sessionFactory.saveItem(storage.nearbyCoffeehouses, coffeehouseList);
                    console.log(vm.coffeehouse.tags);
                    vm.newTag = null;
                })
            };
        };

        coffeehouseController.$inject = ['$routeParams', '$location', '$scope', '$rootScope', 'loggedInService', 'sessionFactory', 'storage', 'coffeehouseService'];
        return{
            restrict: 'E',
            templateUrl: '../templates/coffeehouse.html',
            controller: coffeehouseController,
            controllerAs: 'vm'
        }
    })
});