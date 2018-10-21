

"use strict";


angular.module('myApp',[]);

angular.module('myApp').controller('MainController', ['$scope','$http',function($scope,$http) {
var vm = this;

$scope.myFunction =function() {
	console.log('hi');
}

vm.selectCat=selectCat;

$scope.toggle = true;

    $scope.$watch('toggle', function(){
        $scope.toggleText = $scope.toggle ? 'Edit' : 'Close';

    })

function selectCat(pos) {
  vm.selectedCat = pos;

};

$scope.fetchUsers = function() {

$http({
            method: 'post',
            url: 'getData.php',
             data: {request_type: 1}
            }).then(function successCallback(response) {
                $scope.Cats = response.data;
                vm.selectedCat=$scope.Cats[0];


            });
      }

       // Call fetchUsers() method
            $scope.fetchUsers();

            // Set value to search box
            $scope.updateDetail = function(user,field){
                var userid= user.id;

                var value = "";
                switch(field){
                    case 'CatName': value = user.CatName;
                        break;
                    case 'ImagePath': value = user.ImagePath;
                        break;

                }

                $http({
                method: 'post',
                url: 'getData.php',
                data: {field: field,value: value,userid: userid,request_type: 2}
                }).then(function successCallback(response) {
                    console.log('Update successfully');
                });
            }

            $scope.add = function(){

                var len = $scope.Cats.length;
                $http({
                method: 'post',
                url: 'getData.php',
                data: {CatName:$scope.CatName,ImagePath:$scope.ImagePath,request_type:3,len:len},
                }).then(function successCallback(response) {
                    $scope.Cats.push(response.data[0]);
                });

                $scope.CatName = "";

    $scope.clearSearch = function () {
        $scope.CatName = "";
    };

     $scope.ImagePath= "";

    $scope.clearImagePath = function () {
        $scope.ImagePath = "";
    };

            }

            $(".ConfirmDelete").click(function() {
            	return confirm("Are you sure you want to delete this item?");
            });





            // Delete record
            $scope.remove = function(index,userid){

            	var result =confirm("Are you sure you want to delete this record?");
            	if (result)  {

                $http({
                method: 'post',
                url: 'getData.php',
                data: {userid:userid,request_type:4},
                }).then(function successCallback(response) {
                    $scope.Cats.splice(index, 1);
                });
            }
           }

}]);







