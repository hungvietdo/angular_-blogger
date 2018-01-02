var myApp = angular.module('myApp',[
	'ngRoute',
	'artistControllers'
]);

myApp.config(['$routeProvider', function($routeProvider)
{
	$routeProvider.
	when('/list', {
		templateUrl: 'partials/list.html',
		controller: 'ListController'
	}).
	when('/list/:nextPageToken', {
		templateUrl: 'partials/list.html',
		controller: 'ListController'
	}).
	 when('/details/:itemId',{
	 	templateUrl: 'partials/details.html',
	 	controller: 'DetailsController'
	 }).
	 when('/comment/:itemId',{
	 	templateUrl: 'partials/comment.html',
	 	controller: 'CommentController'
	 }).
	 when('/comment/:itemId/nextPage/:nextPageToken',{
	 	templateUrl: 'partials/comment.html',
	 	controller: 'CommentController'
	 }).
	otherwise({
		redirectTo:'/list'
	});
}
	]);
