var fs = require('fs');

var csv = fs.readFileSync("Hooplarapport-2812029077-148777238 - Billetter.csv", 'utf8');

var data = {};

var csvLines = csv.split(/\r?\n/);
var headerLine = csvLines.shift();
var headers = headerLine.split(",");

for (var i in csvLines) {
	var line = csvLines[i];
	var lineSplit = line.split(",");
	var id = lineSplit[0];
	data[id] = {};
	for (var j in lineSplit) {
		data[id][headers[j]] = lineSplit[j];
	}
}

var jsonFileString = "var fagdagbilletter = " + JSON.stringify(data);

fs.writeFileSync("fagdagbilletter.js", jsonFileString, 'utf8');