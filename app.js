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

  app.controller("MsInvController", function($scope, $http, InventoryFactory) {
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

//		$scope.open = function(sn) {
//			var modalInstance = $modal.open({
//				templateUrl: 'arrayModal.html',
//				controller: 'ArrayModalCtrl',
//			});
//		};



    $scope.getData = function(selectedDuns,selectedName) {
			$scope.selectedCustomer = selectedName;
    	InventoryFactory.getInv(selectedDuns).success(function(data) {
    		$scope.myData = data['rows'];
    		$scope.myPages = data['pages'];
			})
		};
	});

//	app.controller('ArrayModalCtrl', function($scope, $modalInstance, sn) {
//		$scope.sn = sn;
//		$scope.ok = function() {
//			$modalInstance.close()
//		};
//	});



  app.factory("InventoryFactory", function($http) {
    return {
      getInv: function(dunId){
        return $http.get('http://pnwreport.bellevue.lab/api/installs/' + dunId)
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
