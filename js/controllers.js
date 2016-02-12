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
     			'applicationData',

     			function ($scope, dataService, appData){
     				// add a title property which we can refer to in our view (index.html in this example)
     				//$scope.title = 'Course & Student Information';
     				//$scope.subTitle = 'Course listing';
     				$scope.coursetitle = '';

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

     				var getNavigation = function(){
     					dataService.getNavigation().then(
     						function(response){
     							$scope.navigation = response.data;
     						},
     						function(err){
     							$scope.navStatus = 'Unable to load navigation ' + err;
     						},
     						function(notify){
     							console.log(notify);
							}
						);
     				};

     				$scope.$on('systemInfo_course', function(ev, course){
     					$scope.coursetitle = course.coursetitle;
					});

     				getSysInfo();
     				getNavigation();
     			}
     		]
     	).
     	controller('CourseController', // create CourseController
     		[
     			'$scope',
     			'dataService', // pass in the name we gave our angular.service()
     			'$location',
     			'applicationData',

     			function ($scope, dataService, $location, appData){ // declare thye two dependencies as parameters
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

     				appData.publishInfo('course', {});

     				var courseInfo = $location.path().substr(1).split('/');
     				if(courseInfo.length === 2){
     					// use the course code from the path and assign to selectedCourse so if the page is reloaded it's highlighted
     					$scope.selectedCourse = {coursecode: courseInfo[1]};
     				}
     				//$scope.selectedCourse = {};

					$scope.selectCourse = function($event, course){
						$scope.selectedCourse = course;
						$location.path('/courses/' + course.coursecode);
						appData.publishInfo('course', course);
					}




     				getCourses(); // call the method just defined
     			}
     		]
     	).
     	controller('CourseStudentsController',
     		[
     			'$scope',
     			'dataService',
     			'$routeParams', // another built in variable, giving us access to the paramter in the url which we named :courseid
     			'$location',


     			function($scope, dataService, $routeParams, $location){
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

     				var studentInfo = $location.path().substr(1).split('/');
     				if(studentInfo.length === 3){
     					$scope.selectedStudent = {studentId: studentInfo[2]};
     				}

     				$scope.selectStudent = function($event, student){
     					// $event is built in object storing info about the click
     					// student is passed in
     					$scope.selectedStudent = student;
     					// later, build in redirect for when clicking on student
     				}
     			}
     		]
     	);
}());