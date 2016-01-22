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
     			function ($scope){
     				// add a title property which we can refer to in our view (index.html in this example)
     				$scope.title = 'Course & Student Information';
     				$scope.subTitle = 'Course listing';
     			}
     		]
     	).
     	controller('CourseController', // create CourseController
     		[
     			'$scope',
     			/**
     			 *
     			 * @access public
     			 * @return void
     			 **/
     			function ($scope){
  					$scope.courses = [ // create a variable to hold an array of object literals, one for each course
  						{
  							coursecode: "ACT6BNN31",
                            coursetitle: "APPLIED COMPUTING TECHNOLOGIES SEP NEWCASTLE",
                            department: "Computing"
  						},
  						{
                            coursecode: "CNT1BNN23",
                            coursetitle: "COMPUTER & NETWORK TECHNOLOGY SEP NEWCASTLE",
                            department: "Computing"
                        },
                        {
                            coursecode: "CAE1BNN23",
                            coursetitle: "COMPUTER AIDED ENGINEERING SEP NEWCASTLE",
                            department: "Computing"
                        },
                        {
                            coursecode: "CFO1BNN23",
                            coursetitle: "COMPUTER FORENSICS SEP NEWCASTLE",
                            department: "Computing"
                        }
  					];
     			}
     		]
     	);
}());