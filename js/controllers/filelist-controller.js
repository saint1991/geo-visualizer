'use strict';

(function() {
	
	var fileListModule = angular.module('geovisualizer.filelist');

	//Check  the availability of File API
	if ( !(window.File && window.FileReader && window.FileList) ) {
		alert("File API is not available on this browser");
		return;
	}


	//Definitions of Directive
	fileListModule.directive('fileChange', ['$parse', function($parse) {

		var fileChangeDef = {
			
			require: 'ngModel',

			restrict: 'A',
			
			scope: false,

			template: '',
			
			link: function ($scope, element, attrs, ngModel) {

				var fileChange = attrs['fileChange'];
;				var attrHandler = $parse(attrs['fileChange']);
				var handler = function(e) {
					$scope.$apply(function() {
						attrHandler($scope, {$event: e, files: e.target.files});
					});
				};

				var el = element[0];
				$(element[0]).on('change', handler);

			}
		};

		return fileChangeDef;
	}]);

	
	//Definitions of Controller
	fileListModule.controller('filelistController', ['$scope', function($scope) {
		
		//this is  a filel list loaded so far
		$scope.fileList = [];

		//this is an array that receive the change of input type="file"
		$scope.selectedFiles = [];

		//this event listener is called when files are loaded
		$scope.filelistChanged = function($event, files) {
			for (var i = 0; i < files.length; i++) {
				$scope.$parent.datas.push(files);
			}
		};

	}]);


})();