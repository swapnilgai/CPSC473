/**
 * Created by swapnil on 4/27/16.
 */

var app =angular.module('recipeProj', [])

.controller('addRecipe',['$scope', '$http', function($scope, $http) {
        $scope.addRecipeFunc = function(recipe) {
            var req = {
                method: 'POST',
                url: 'http://localhost:5000/addRecipe',
                headers: {
                    'Content-Type': "application/json"
                },
                data: {"recipe": [{"title": recipe.title, "text": recipe.text, "date": new Date()}]}
            }

        if(recipe.title.length >10 && recipe.title.length  <30 && recipe.text.length>10 && recipe.text.length <500) {
            $http(req).then(function (response) {

                $scope.recipe.push(response.data);
                $scope.recipe.title = "";
                $scope.recipe.text = "";
            });
        }   else
        {
            if(recipe.title.length<10 && recipe.title.length>30){
                alert("Title length must be grater than 10 or less than 30");
            }
            else{
                alert("Text length must be grater than 10 or less than 500");
                }
}
        }

    }])


    .controller('getRecipe',['$scope', '$http', function($scope, $http) {
        $scope.getRecipeFunc = function() {

            $scope.recipe = [];

                $http({
                    method: 'GET',
                    url: 'http://localhost:5000/getRecipe'
                }).then(function successCallback(response) {
                    $scope.recipe = response.data;

                }, function errorCallback(response) {

                });
        };

    }]);




