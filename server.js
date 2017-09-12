var http = require('http');
var fs = require('fs');
var path = require("path");
var url = require("url");

var port = 8080;

var contentTypeMappings = {
	".js": "application/javascript",
	".html": "text/html",
	".htm": "text/html",
	".wav": "audio/wav",
	".ogg": "audio/ogg",
	".css": "text/css",
	".png": "image/png",
	".jpeg": "image/jpeg",
	".jpg": "image/jpeg"
}

http.createServer(function (req, res) {
	try {
		var parsed = url.parse(req.url);
		var pathname = decodeURI(parsed.pathname);
		if (pathname == "/") pathname = "/index.html";
		var fileExtension = path.extname(pathname);
		res.writeHead(200, {'Content-Type': contentTypeMappings[fileExtension]});
		var file = fs.readFileSync("./" + pathname);
		res.end(file);
	} catch (e) {
		var httpCode = 500;
		if (e.code == "ENOENT") httpCode = 404;
		if (pathname.indexOf("favicon") != -1) httpCode = 204; // No content
		res.writeHead(httpCode, {'Content-Type': 'text/html'});
		res.end(e.toString());
		var isDefaultFavicon404 = e.code == "ENOENT" && pathname.indexOf("favicon.ico") != -1
		if (!isDefaultFavicon404) {
			console.error(e.toString());
		}
	}
		
}).listen(port);

console.log("server running on port " + port);