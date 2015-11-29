var app=angular.module("ModalitiesCheckModule",["ngMaterial","angular_list","angular_table","sbiModule","angular_2_col"]);
app.controller("ModalitiesCheckController",["sbiModule_translate","sbiModule_restServices", "$scope","$mdDialog","$mdToast",ModalitiesCheckFunction]);
function ModalitiesCheckFunction(sbiModule_translate, sbiModule_restServices, $scope, $mdDialog, $mdToast){
	
	$scope.showme = false;
	$scope.additionalField= false;
	$scope.translate=sbiModule_translate;
	$scope.SelectedConstraint={};
	$scope.predefined =[];
	$scope.label={};
	$scope.ItemList=[];
	$scope.listType=[];
	

	$scope.loadConstraints=function(item){
		$scope.SelectedConstraint=angular.copy(item);
		$scope.showme=true;
		$scope.label = "";
	} 	                
	
	
	
	$scope.createConstraints =function(){
		$scope.SelectedConstraint={};
		$scope.showme=true;
		
		//$scope.button_flag = true;
		
	
	}
	$scope.saveConstraints= function(){
		console.log(angular.toJson($scope.SelectedConstraint));
		sbiModule_restServices
	    .post("2.0/detailmodalities","",angular.toJson($scope.SelectedConstraint));
	}
	$scope.cancel = function() {
		$scope.showme = false;
		$scope.SelectedConstraint={};

	}
	
	$scope.FieldsCheck = function(l){
		
		$scope.label = l.VALUE_DS;
		$scope.SelectedConstraint.valueTypeId=l.VALUE_ID;
		if(l.VALUE_NM == "Range"){
			$scope.additionalField= true;
		}else{
			$scope.additionalField= false;
		}
	}
	$scope.getPredefined = function(){
		sbiModule_restServices.get("2.0", "modalities").success(
				function(data, status, headers, config) {
					console.log(data);
					if (data.hasOwnProperty("errors")) {
						console.log(sbiModule_translate.load("sbi.glossary.load.error"),3000);
					} else {
						$scope.predefined = data;
					}
				}).error(function(data, status, headers, config) {
					console.log(sbiModule_translate.load("sbi.glossary.load.error"), 3000);

				})	
	}
	$scope.getPredefined();
	
	$scope.getCustom = function(){
		sbiModule_restServices.get("2.0", "detailmodalities").success(
				function(data, status, headers, config) {
					console.log(data);
					if (data.hasOwnProperty("errors")) {
						console.log(sbiModule_translate.load("sbi.glossary.load.error"),3000);
					} else {
						$scope.ItemList = data;
					}
				}).error(function(data, status, headers, config) {
					console.log(sbiModule_translate.load("sbi.glossary.load.error"), 3000);

				})	
	}
	$scope.getCustom();		
	
	$scope.getDomainType = function(){
		sbiModule_restServices.get("domains", "listValueDescriptionByType","DOMAIN_TYPE=CHECK").success(
				function(data, status, headers, config) {
					console.log(data);
					if (data.hasOwnProperty("errors")) {
						console.log(sbiModule_translate.load("sbi.glossary.load.error"),3000);
					} else {
						$scope.listType = data;
					}
				}).error(function(data, status, headers, config) {
					console.log(sbiModule_translate.load("sbi.glossary.load.error"), 3000);

				})	
	}
	$scope.getDomainType();
};
