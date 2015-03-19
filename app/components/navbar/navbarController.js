/**
 * Created by Tobias on 2015-03-04.
 */
'use strict';
//define dependent files
define(['shared/isLoggedIn'], function () {

    var navbar = angular.module('nav', []);

    navbar.directive('navbar', function(){
        var navController = function($scope, $rootScope, loggedInService){
            console.log(loggedInService);
            var vm = this;
            vm.kalle = "kalle";
            $scope.$on('loggedIn', function(e, data){
               vm.loggedIn = data.token;
                vm.username = data.username;
            })
        };
        navController.$inject =  ['$scope', '$rootScope', 'loggedInService'];

        return{
            restrict: 'E',
            templateUrl: '/components/navbar/navbarView.html',
            controller: navController,
            controllerAs: 'vm'
        }
    })
});