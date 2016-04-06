/**
 * Created by richardwarg on 4/4/2016.
 * step 20 of learn code tutorials
 * git started 0n 5/5/16
 */
var myApp = angular.module('myApp',[]);
myApp.controller('AppCtrl',['$scope','$http', function ($scope,$http){
    console.log("Hello from the controller");
    $http.get('/contactlist').success(function(response){
        console.log("I got the data I requested");
        $scope.contactlist = response;
    });
    $scope.addContact = function(){
        console.log($scope.contact);
        $http.post('/contactlist', $scope.contact);
    };

   }]);