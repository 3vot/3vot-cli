var Path = require("path");
var fs = require("fs");
var extend = require('util')._extend;
var Url = require("url")

function execute(req, res, next) {

	var url = Url.parse(req.path);
	var name = url.pathname.split("/")[1]

	var votsPath = Path.join(process.cwd(), "vots", name + ".js")

	var exists = fs.existsSync(votsPath);
	console.log(votsPath)
	if(!exists) return res.send( "Vot not found: " + name );

	delete require.cache[votsPath];
	var Vot = require(votsPath);

	var data = req.query || {}
	data = extend(data, req.body)

	function callback(error, response){
		if(error) return res.send(error, 500);
		res.header("Content-Type", "application/json");
		res.send(response);
	}
	
	Vot(data, callback, req);
}

module.exports = execute;