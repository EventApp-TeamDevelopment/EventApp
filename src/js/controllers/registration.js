angular.module('mainApp')

	.controller('registController',['$scope', '$http', '$uibModal', '$sce','$uibModalInstance', function (sc, $http, uibModal, sce, uibModalInstance){

	  sc.errorMsg = '';


	// download top events
	// should be fixed

	  $http.get('/api/topevents')
	    .then(function(response) {
	      sc.events = angular.fromJson(response.data);
	    });

	// post user data on server

	  sc.postData = function() {
			// validate password with regular expression
      var patt = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
	    if(sc.user_password === sc.user_repassword && patt.test(sc.user_password)) {
	      $http.post('http://localhost:8000/api/users/', {
	        "email": sc.user_email,
	        "username": sc.user_name,
	        "password": sc.user_password,
					"userPhoto": ''
	      }); 
    } else {
      sc.errorMsg = 'Confirmation failed! Password should consist at least of 6 characters (numbers, both lower-case, upper-case letters)';
      sc.user_password = '';
      sc.user_repassword = '';
    }
  };

	  sc.close = function () {
	    uibModalInstance.close();
	  };

	    sc.event = {
	      name: "name",
	      place: "place",
	      payment: "type",
	      dt: "date",
	      time: "time",
	      description: "text",
				photoURL: ''

	    };



	}]);
