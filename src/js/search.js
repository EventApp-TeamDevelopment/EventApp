
angular.module('mainApp')


// .filter("dateRangeFilter", function() {
//   return function(evs, from, to) {
//     var df = parseDate(from);
//     var dt = parseDate(to);
//     var result = [];
//     for (var i = 0; i < evs.length; i++) {
//       var date_bet = evs[i].dt;
//       if (date_bet > df && dt > date_bet) {
//         result.push(evs[i]);
//       }
//     }
//     return result;
//   };
// })

    .controller("homeCtrl", function($scope, $filter) {

        var self = this;
        var data = [{
            name: "Moroni",
            age: 50,
            datetime: 1450562394000
        }, {
            name: "Simon",
            age: 43,
            datetime: 1450562394000
        }, {
            name: "Jacob",
            age: 27,
            datetime: 1450648794000
        }, {
            name: "Nephi",
            age: 29,
            datetime: 1450648794000
        }, {
            name: "Christian",
            age: 34,
            datetime: 1450475994000
        }, {
            name: "Tiancum",
            age: 43,
            datetime: 1450475994000
        }, {
            name: "Jacob",
            age: 27,
            datetime: 1450475994000
        }];

        // self.sensorTableData = new NgTableParams({
        //   count: 7
        // }, {
        //   dataset: data
        // });

        $scope.today = function() {
            $scope.dt2 = new Date(2015, 11, 26);
            $scope.dt1 = new Date(2015, 11, 17);

        };



        $scope.today();
        $scope.toggleMin = function() {
            $scope.minDate = $scope.minDate ? null : new Date();
        };
        $scope.toggleMin();
        $scope.maxDate = new Date(2020, 5, 22);



        $scope.setDate = function(year, month, day) {
            $scope.dt1 = new Date(year, month, day);
            $scope.dt2 = new Date(year, month, day);

        };

        $scope.dateOptions = {
            formatYear: 'yy',
            startingDay: 1
        };

        $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
        $scope.format = $scope.formats[0];

        $scope.status1 = {
            opened: false
        };

        $scope.status2 = {
            opened: false
        };


    });

function parseDate(input) {
    return Date.parse(input);
}