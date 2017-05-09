angular.module('mainApp')
.controller('EventController', ['$scope', '$multipartForm', '$uibModalInstance', function (sc, multipartForm, uibModalInstance) {


  var nowDate = new Date();
  var today = new Date(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate(), 0, 0, 0, 0);


  sc.submit = function () {
      var uploadUrl = '/api/events';
      multipartForm.post(uploadUrl, sc.event);
      uibModalInstance.close();
  };
//timepicker

  sc.hstep = 1;
  sc.mstep = 15;

  sc.options = {
    hstep: [1, 2, 3],
    mstep: [1, 5, 10, 15, 25, 30]
  };
  sc.format = 'dd-MMMM-yyyy';

  sc.update = function() {
    var d = new Date();
    d.setHours( 14 );
    d.setMinutes( 0 );
    sc.time = d;
  };

  sc.options = {
    showWeeks: false
  };

  sc.toggleMin = function() {
    $scope.options.minDate = $scope.options.minDate ? null : new Date();
  };

  sc.close = function () {
    uibModalInstance.close();
  };

}]);
