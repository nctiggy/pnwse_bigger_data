(function(){
  var app = angular.module("microsoft", ['smart-table']);

  var duns = [
    { 
      name: "Microsoft",
      id: "81466849" 
    },
    {
      name: "Costco",
      id: "103391843"
    },
		{
			name: "Los Angeles International",
			id: "LAX"
		},
		{
			name: "Houston",
			id: "IAH"
		},
		{
			name: "Chicago",
			id: "ORD"
		}
  ];

  app.controller("MsInvController", function($scope, $filter, InventoryFactory) {
    $scope.companyList = duns;
    $scope.getData = function() {
    	InventoryFactory.getInv($scope.selectedDuns).success(function(data) {
    		$scope.myData = data['rows'];
			})
		};
	});

  app.factory("InventoryFactory", function($http) {

    return {
      getInv: function(dunId){
        return $http.get('http://opsconsole.corp.emc.com/sitelookup/new/models/getdataTLA.php?fld=Global%20Duns%20Number&val=' + dunId + '&_search=false&nd=1415402285504&rows=4000&page=1&sidx=&sord=asc&_=1415391480174')
        //return $http.get('http://services.faa.gov/airport/status/' + air + '?format=application/json')
			}
    }
  });

})();
