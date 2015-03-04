/**
 * Created by Tobias on 2015-03-04.
 */
'use strict';
define(['app/app'], function (app) {

    console.log(app.register);

    //The $scope is ultimately bound to the customers view due to convention followed by the routeResolver
    app.register.controller('coffeehouseController', ['$scope',
        function ($scope) {
            console.log("YEEEEHAAAAAAAAAAA");
            $scope.Hello = "Hello Angular ";

        }]);
});