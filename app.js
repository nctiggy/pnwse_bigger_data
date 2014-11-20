(function(){
  var app = angular.module("microsoft", ['smart-table']);

  var duns = [
    { 
      name: "Microsoft",
      id: "081466849" 
    },
    {
      name: "Costco",
      id: "103391843"
    }
  ];

  app.controller("MsInvController", function($scope, $filter, InventoryFactory) {
    $scope.companyList = duns;
    $scope.getData = function() {
    	InventoryFactory.getInv($scope.selectedDuns).success(function(data) {
    		$scope.myData = data['rows'];
    		//$scope.myPages = data['pages'];
			})
		};
	});

  app.factory("InventoryFactory", function($http) {

    return {
      getInv: function(dunId){
        return $http.get('http://opsconsole.corp.emc.com/sitelookup/new/models/getdataTLA.php?fld=Global%20Duns%20Number&val=' + dunId + '&_search=false&nd=1415402285504&rows=4000&page=1&sidx=&sord=asc')
        //return $http.get('http://services.faa.gov/airport/status/' + air + '?format=application/json')
			}
    }
  });

})();
