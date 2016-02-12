(function(){ // IIFE
	'use strict'; // turn on strict JS mode
	/* Service to return the data */

	angular.module('CourseApp'). // extending CourseApp
		service('dataService',	// the data service name can be anything we want
			[	'$q', // dependency, $q handles promises - the request initially returns a promise, not the data
				'$http', // dependency, $http handles the ajax request
				function($q, $http){ // parameters must be in the same order as the dependencies

					/*
					* var to hold the data base url
					*/
					var urlBase = '/year-3/CM0665-web-app-int/angular/server/index.php';

					/*
					* method to retrieve courses or, more accurately, a promise which, when fulfilled, calls the success method
					*
					*/
					this.getCourses = function(){  // "this" is the dataService object
						var defer = $q.defer(),	// the promise
							data = {
								action: 'list',
								subject: 'courses'
							};
							//courseUrl = urlBase + 'courses.json'; // add the static file containing courses to the base url
						/**
						* make an ajax get call
						* chain calls to .success and .error which will reolve or reject the promise
						* @param {string} urlBase - The url to call
						* @param {object} config = a configuration object, can contain paramters to pass - in this case we'll set cache to true
						* @param {object} promise = the call returns not data, but a promise, which is only honoured if the call is successful
						*/
						$http.get(urlBase, {params: data, cache:true}). // dot to chain method on next line. Cache set to true since data won't change
							success(function(response){ // the sucess function has a function passed to it as a parameter. That function's "response" parameter will hold the response from the ajax get() call
								defer.resolve({ // we define the defer.resolve() function - defer being the promise object. The argument passed is the object which will be returned if the promise is "resolved"
									data: response.ResultSet.Result,
									rowCount: response.ResultSet.RowCount
								});
							}).
							error(function(err){ // this will happen if get() returns an error
								defer.reject(err); // call the defer object's reject method
							});
							// the call to getCourses returns this promise which is fulfilled
							// by the .get method .success or .failure
							return defer.promise;
					};

					this.getSysInfo = function(){
						var defer = $q.defer(), // create promise
							sysInfoUrl = urlBase + 'appInfo.json';

						// make ajax call
						$http.get(sysInfoUrl, {cache:false}).
							success(function(response){
								defer.resolve({
									title: response.title,
									author: response.author
								});
							}).
							error(function(err){
								defer.reject(err);
							});
							return defer.promise;
					};

					/**
					 *
					 * @param {string} courseCode The course code for the course the students are following
					 * @returns {object} promise
					 */
					this.getStudents = function(courseCode){
						var defer = $q.defer(),
							data = {
								action: 'list',
								subject: 'students',
								id: courseCode
							};
							//studentsUrl = urlBase + courseCode + '_students.json';

						$http.get(urlBase, {params: data, cache: false}).
							success(function(response){
								defer.resolve({
									data: response.ResultSet.Result,
									rowCount: response.ResultSet.RowCount
								});
							}).
							error(function(err){
								defer.reject(err);
							});
						// the call to getCourses returns this promise which is fulfilled
						// by the .get method .success or .failure
						return defer.promise;
					};

					// pull back the sitemap data to be able to construct the navigation
					this.getNavigation = function(){
						var defer = $q.defer(),
							navUrl = urlBase + 'navigation.json';

						$http.get(navUrl, {cache: false}).
							success(function(response){
								defer.resolve({
									data: response.navigation,
								});
							}).
							error(function(err){
								defer.reject(err);
							});
						return defer.promise;
					};

				}
			]
		).
		service('applicationData',
			function($rootScope){ // root scope is predefined in angular
				var sharedService = {};
				sharedService.info = {};

				sharedService.publishInfo = function(key, obj){
					this.info[key] = obj;
					$rootScope.$broadcast('systemInfo_'+key, obj);
				};

				return sharedService;
			}
		);

}());