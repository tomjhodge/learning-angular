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
					var urlBase = '/angular/server/';

					/*
					* method to retrieve courses or, more accurately, a promise which, when fulfilled, calls the success method
					*
					*/
					this.getCourses = function(){  // "this" is the dataService object
						var defer = $q.defer(),	// the promise
							courseUrl = urlBase + 'courses.json'; // add the static file containing courses to the base url
						/**
						* make an ajax get call
						* chain calls to .success and .error which will reolve or reject the promise
						* @param {string} urlBase - The url to call
						* @param {object} config = a configuration object, can contain paramters to pass - in this case we'll set cache to true
						* @param {object} promise = the call returns not data, but a promise, which is only honoured if the call is successful
						*/
						$http.get(courseUrl, {cache:true}). // dot to chain method on next line. Cache set to true since data won't change
							success(function(response){ // the sucess function has a function passed to it as a parameter. That function's "response" parameter will hold the response from the ajax get() call
								defer.resolve({ // we define the defer.resolve() function - defer being the promise object. The argument passed is the object which will be returned if the promise is "resolved"
									data: response.results,
									rowCount: response.courseCount
								});
							}).
							error(function(err){ // this will happen if get() returns an error
								defer.reject(err); // call the defer object's reject method
							});
							// the call to getCourses returns this promise which is fulfilled
							// by the .get method .success or .failure
							return defer.promise
					};
				}
			]
		);

}());