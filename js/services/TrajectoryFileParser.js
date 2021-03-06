'use strict';

(function() {

	var fileParseModule = angular.module('geovisualizer.fileparser');

	fileParseModule.service('TrajectoryFileParser', ['GeoLifeDataFormat', 'SemanticTrajectoryDataFormat', function(GeoLifeDataFormat, SemanticTrajectoryDataFormat) {

		var parser = {
			
			'oplt': function(textContent) {

				var retData = [];

				var lines = textContent.split('\n');
				for (var i = 0; i < lines.length - 1; i++) {
					
					var lineArray = lines[i].split(',');
					if (lineArray.length !== 3 && lineArray.length !== 4) {
						continue;
					}

					var latitude = parseFloat(lineArray[0]);
					var longitude = parseFloat(lineArray[1]);
					var timestamp = new Date(lineArray[2].replace(/-/g, '/'));

					var poi = lineArray[3];
					var entry = new GeoLifeDataFormat(latitude, longitude, timestamp, poi);
					retData.push(entry);
				}

				return retData;
			},

			'plt': function(textContent) {

				var retData = [];

				var lines = textContent.split('\n');
				for (var i = 0; i < lines.length; i++) {
					
					var lineArray = lines[i].split(',');
					if (lineArray.length !== 7) {
						continue;
					}

					var latitude = parseFloat(lineArray[0]);
					var longitude = parseFloat(lineArray[1]);
					var timestampStr = lineArray[5] + ' ' + lineArray[6];
					var timestamp = new Date(timestampStr.replace(/-/g, '/'));
					var poi = 'none';

					var entry = new GeoLifeDataFormat(latitude, longitude, timestamp, poi);
					retData.push(entry);
				}
				
				return retData;
			},

			'st': function(textContent) {

				var retData = [];

				var lines = textContent.split('\n');
				for (var i = 0; i < lines.length; i++) {
					
					var lineArray = lines[i].split(',');
					if (lineArray.length !== 5) {
						continue;
					}

					var latitude = parseFloat(lineArray[0]);
					var longitude = parseFloat(lineArray[1]);
					var timestampStr = lineArray[2];
					var timestamp = new Date(timestampStr.replace(/-/g, '/'));
					var venue_name = lineArray[3];
					var category_name = lineArray[4];
					var entry = new SemanticTrajectoryDataFormat(latitude, longitude, timestamp, venue_name, category_name);

					retData.push(entry);
				}
				
				return retData;
			}
		};

		this.parse = function(textContent, ext) {
			
			var parseFunc = parser[ext];
			if (!parseFunc) {
				alert('Invalid File type');
				return null;
			}

			var retData = parseFunc(textContent);
			return retData;
		};
	}]);
 
})();