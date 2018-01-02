var artistControllers = angular.module('artistControllers', []);

var maxResultsPerPage = 300;

var blogid = "2275817107352430673"; //ahtt

//var blogid = "953024975153422094"; //ws-dl group
var userkey = "AIzaSyDM6n2FS6rMab-OSJ3NZN6fnBRJtG3nreQ";

var url = "https://www.googleapis.com/blogger/v3/blogs/"+blogid+"/posts?fetchBodies=false&key=" + userkey;

//List of post controller
artistControllers.controller('ListController', ['$scope','$http','$routeParams', 

	function ($scope,$http,$routeParams) {
	
	$scope.message=$routeParams.nextPageToken;
	 if ($scope.message !== undefined)
	{
			url = "https://www.googleapis.com/blogger/v3/blogs/"+blogid+"/posts";
			url = url + "?&key=" + userkey;
			url = url + "&pageToken=" + $scope.message;
			//console.log(url);
	}

	$http.get(url).success  (function(data){
		$scope.artists =  data.items;
		$scope.nextPageToken = data.nextPageToken;

	});
}]);


//Detail controller
artistControllers.controller('DetailsController', ['$scope','$http','$routeParams', '$sce',

	function ($scope,$http,$routeParams,$sce) {
	

 $scope.renderHtml = function (htmlCode) {
            return $sce.trustAsHtml(htmlCode);
        };

	var urldetail = "https://www.googleapis.com/blogger/v3/blogs/"+blogid+"/posts/";
			urldetail = urldetail + $routeParams.itemId;
			urldetail = urldetail + "?key=" + userkey;
			

	$scope.message= urldetail;
	$http.get(urldetail).success  (function(data){



		$scope.artists =  data;
		
		 //$scope.thisCanBeusedInsideNgBindHtml = $sce.trustAsHtml(data.content);
		 $scope.body = data.content;
		
 

	});

}]);

//Comment Controller

artistControllers.controller('CommentController', ['$scope','$http','$routeParams', '$sce',



	function ($scope,$http,$routeParams,$sce) {
		 
	//Function to format html 
	$scope.renderHtml = function (htmlCode) {

			//console.log(htmlCode);
			var str = htmlCode;
			var str_rep = str.replace("[img=","<img width='480' src='")
			str_rep = str_rep.replace("]","'>")
           // console.log(str_rep);
            return $sce.trustAsHtml(str_rep);

        };

	var urlcomment = "https://www.googleapis.com/blogger/v3/blogs/"+blogid+"/posts/";
			urlcomment = urlcomment + $routeParams.itemId;
			urlcomment = urlcomment + "/comments";
			urlcomment = urlcomment + "?maxResults=" + maxResultsPerPage + "&key=" + userkey;
	
	$scope.message=$routeParams.nextPageToken;
	
	if ($scope.message !== undefined)
		{

			urlcomment = urlcomment + "&pageToken=" + $scope.message;			
			console.log(urlcomment);
		}		

	$http.get(urlcomment).success  (function(data){
		var str = data.items;
		$scope.comments =  str;
		$scope.body = data.items;
		//get next page token of comments page
		$scope.nextPageToken = data.nextPageToken;
		$scope.itemId = data.items[0].post.id;

		//console.log(data.post);
	});
}]);



