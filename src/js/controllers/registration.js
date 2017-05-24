angular.module('mainApp')

    .controller('registController',['$scope', '$http', '$uibModal', '$sce','$uibModalInstance', function (sc, $http, uibModal, sce, uibModalInstance){

        sc.user = {};
        sc.user.errorMsg = '';
        sc.user.email = "";
        sc.user.isNotValid = true;
        sc.user.password = "";
        sc.user.repassword = "";

        var validateEmail = function(email) {
            var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
        }

        sc.changeEmail = function () {
            console.log("Email:"+sc.user.email);
            console.log(sc);
            if(validateEmail(sc.user.email)) {
                sc.user.errorMsg = '';
                $http.get('http://localhost:8000/api/users/?email=' + sc.user.email)
                    .then(function successCallback(response) {
                        console.log("succ:"+response);
                        console.log(response);
                        sc.user.isNotValid = true;
                        sc.user.errorMsg = "This email is already used !"
                        // this callback will be called asynchronously
                        // when the response is available
                    }, function errorCallback(response) {
                        console.log("err:"+response);
                        console.log(response);
                        sc.user.errorMsg = "";
                        sc.user.isNotValid = false;
                        // called asynchronously if an error occurs
                        // or server returns response with an error status.
                    });
            } else {
                sc.user.isNotValid = true;
                sc.user.errorMsg = "This email is invalid!";
            }

        };

        sc.changePassword = function () {
            var patt = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
            if(!patt.test(sc.user.password)) {
                sc.user.isNotValid = true;
                sc.user.errorMsg = 'Password should consist at least of 6 characters (numbers, both lower-case, upper-case letters)';
            } else {
                sc.user.isNotValid = false;
                sc.user.errorMsg = '';
            }
        }



        // download top events
        // should be fixed

        $http.get('/api/topevents')
            .then(function(response) {
                sc.events = angular.fromJson(response.data);
            });

        // post user data on server

        sc.postData = function() {
            // validate password with regular expression

            if(sc.user.password === sc.user_repassword  ) {
                $http.post('http://localhost:8000/api/users/', {
                    "email": sc.user.email,
                    "username": sc.user_name,
                    "password": sc.user_password,
                    "userPhoto": ''
                }).then(function successCallback(response) {
                    console.log("succ:"+response);
                    // this callback will be called asynchronously
                    // when the response is available
                }, function errorCallback(response) {
                    console.log("err:"+response);
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                });

            } else {
                sc.user.errorMsg = 'Confirmation failed!';
                sc.user.password = '';
                sc.user.repassword = '';
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
