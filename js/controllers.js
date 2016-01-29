(function (){
	"use strict";

	/**
     * Extend the module 'CourseApp' instantiated in app.js  To add a controller called
     * IndexController (on line 17) and CourseController (on line 26)
     *
     * The controller is given two parameters, a name as a string and an array.
     * The array lists any injected objects to add and then a function which will be the
     * controller object and can contain properties and methods.
     * $scope is a built in object which refers to the application model and acts
     * as a sort of link between the controller, its data and the application's views.
     * '
     * @link https://docs.angularjs.org/guide/scope
     */
     angular.module('CourseApp').
     	controller('IndexController', // controller given two parameters, a name and an array
     		[
     			'$scope',
     			'dataService',

     			function ($scope, dataService){
     				// add a title property which we can refer to in our view (index.html in this example)
     				//$scope.title = 'Course & Student Information';
     				//$scope.subTitle = 'Course listing';

     				var getSysInfo = function(){
     					dataService.getSysInfo().then(
     						function(response){
     							$scope.title = response.title;
     							$scope.author = response.author;
     						},
     						function(err){
     						$scope.status = 'Unable to load system data ' + err;
     						},
     						function(notify){
     							console.log(notify);
     						}
     					);
     				};

     				getSysInfo();
     			}
     		]
     	).
     	controller('CourseController', // create CourseController
     		[
     			'$scope',
     			'dataService', // pass in the name we gave our angular.service()

     			function ($scope, dataService){ // declare thye two dependencies as parameters
     				var getCourses = function(){
     					dataService.getCourses().then( // then() is called when the promise is resolved or rejected
     						// .then() takes three arguments which are functions to handle success, failure and notification
     						function(response){
     							$scope.courseCount = response.rowCount + 'courses';
     							$scope.courses = response.data;
     						},
     						function(err){
     							$scope.status = 'Unable to load data ' + err;
     						},
     						function(notify){
     							console.log(notify);
     						}
     					); // end of getCourses().then
     				}; // end of function var getCourses

     				getCourses(); // call the method just defined
     			}
     		]
     	).
     	controller('CourseStudentsController',
     		[
     			'$scope',
     			'dataService',
     			'$routeParams', // another built in variable, giving us access to the paramter in the url which we named :courseid

     			function($scope, dataService, $routeParams){
     				$scope.students = [];
     				$scope.studentCount = 0;

     				var getStudents = function(coursecode){
     					dataService.getStudents(coursecode).then(
     						function(response){
     							$scope.studentCount = response.rowCount;
     							$scope.students = response.data;
     						},
     						function(err){
     							$scope.status = 'Unable to load data ' + err;
     						}
     					); // end of getStudents().then()
     				};

     				// only if there has been a courseid passed in do we bother trying to get the students
     				if($routeParams && $routeParams.courseid){
     					console.log($routeParams.courseid);
     					getStudents($routeParams.courseid);
     				}
     			}
     		]
     	);
}());