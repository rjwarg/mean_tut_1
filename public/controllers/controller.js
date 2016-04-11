/**
 * Created by richardwarg on 4/4/2016.
 * step 20 of learn code tutorials
 * git started 0n 5/5/16
 */
var myApp = angular.module('myApp',[]);
myApp.controller('AppCtrl',['$scope','$http', function ($scope,$http){
    console.log("Hello from the controller");
    var refresh = function() {
        $http.get('/contactlist').success(function (response) {
            console.log("I got the data I requested");
            $scope.contactlist = response;
            $scope.contact = "";
        });
    };

    refresh();
    $scope.addContact = function(){
        console.log($scope.contact);
        // make sure the contact is not empty
        if($scope.contact.name ){
        // make sure the _id is empty
        $scope.contact._id = "";
        $http.post('/contactlist', $scope.contact).success(function(response){
            console.log(response);
            refresh();
        })}
        else{
            alert("The name must not be empty");
        }
    };

    $scope.remove = function(id){
        console.log("remove id = " + id);
        if(confirm("Continue to delete This contact?")){
        $http.delete('/contactlist/' +id).success(function(response){
            console.log(response);
            refresh();
        })};
    };

    $scope.edit = function(id) {
        console.log('edit ' + id);
        $http.get('/contactlist/' + id).success(function (response) {
            console.log(response);
            $scope.contact = response;
            $scope.editing = true;
        });
    };

    $scope.update = function(){
        console.log($scope.contact._id);
        $http.put('/contactlist/' +$scope.contact._id, $scope.contact).success(function(response){
            $scope.editing = false;
            refresh();
        })
    };

    $scope.cancel = function(){
        $scope.editing= false;
        refresh();
    };

   }]);