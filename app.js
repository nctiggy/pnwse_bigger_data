(function(){
  var app = angular.module("microsoft", ['smart-table']);

  var pageNum = [
		{
			id: 15
		},
		{
			id: 30
		},
		{
			id: 45
		},
		{
			id: 60
		},
		{
			id: 75
		},
		{
			id: 90
		}
	];

  app.controller("MsInvController", function($scope, $http, $filter, InventoryFactory, ModelFactory) {
    $scope.companyList = new Array();
    $scope.selectedCustomer = "Select Customer";
   // $scope.selectedDuns = null;
		$http.get('customers.json').success(function(data) {
			$scope.companyList = data;
		});
    $scope.pageNums = pageNum;
    $scope.itemsByPage = 15;
    $scope.modelName = function(model) {
    		switch(model) {
					case "SD-3D":
						return "VMAX 40K";
						break;
					case "SB-3D":
						return "VMAX (Orig)";
						break;
					case "BA-SYS1E":
						return "VMAX 10K";
						break;
					case "S2-3D":
						return "VMAX 20K";
						break;
					default:
						return model;
				}
	};
    $scope.getData = function(selectedDuns,selectedName) {
			$scope.selectedCustomer = selectedName;
    	InventoryFactory.getInv(selectedDuns).success(function(data) {
    		$scope.myData = data['rows'];
    		$scope.myPages = data['pages'];
			})
		};
	});

  app.factory("InventoryFactory", function($http) {
    return {
      getInv: function(dunId){
        return $http.get('http://opsconsole.corp.emc.com/sitelookup/models/getdataTLA.php?fld=Global%20Duns%20Number&val=' + dunId + '&_search=false&nd=1415402285504&rows=4000&page=1&sidx=&sord=asc')
        //return $http.get('http://services.faa.gov/airport/status/' + air + '?format=application/json')
			}
    }
  });

  app.factory("ModelFactory", function() {
    return {
      fixModel: function(model){
				switch(model) {
					case "SD-3D":
						model = "VMAX 40K";
						return model;
						break;
					case "SB-3D":
						return "VMAX (Orig)";
						break;
					case "BA-SYS1E":
						return "VMAX 10K";
						break;
					case "S2-3D":
						return "VMAX 20K";
						break;
					default:
						return model;
				}
			}
    }
  });


})();
