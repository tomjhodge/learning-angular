(function(){ // immediately invoked function
	"use strict"; // turn on javascript strict syntax mode

	/**
	* start a new Application, a module in Angular
	* @param {string} ApplicationName a string which will be the name of this application and, in fact, an object to which we add all other components
	* @param{array} dependencies An array of dependencies, the names are passed as strings
	*/

	angular.module("CourseApp",
		[
			'ngRoute' // the only dependency at this stage, for routing
		]
	). // note the fullstop - chaining the call to config
	config(
		[
			'$routeProvider', // built in variable which injects functionality, passed as a string
			function($routeProvider){
				$routeProvider.
					when('/courses', {
						//templateUrl: 'js/partials/course-list.html',
						controller: 'CourseController'
					}).
					when('/courses/:courseid', {
					// the :course id means that what follows the / won't be the literal word courseid,
					//but instead a parameter, the value of which wil be stored in a variable called courseid
						templateUrl: 'js/partials/student-list.html',
						controller: 'CourseStudentsController'
					}).
					otherwise({
						redirectTo: '/'
					});
			}
		]
	); // end of config method
}()); // end of IIFE