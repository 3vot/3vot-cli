var fs = require("fs")
var _3vot = require("3vot/utils")

var placeholder = "{3vot}"
var local = "//localhost:";
var production = "//3vot.com"

var Q = require("q")

var Transform = { local: toLocal, production: toProduction }

function toLocal( body, transformOptions ){
	var route = local + transformOptions.port
	body = _3vot.replaceAll(body, transformOptions.placeholder || placeholder, route);
	return body;
}

function toProduction(body, transformOptions){
	var route = ""
	if(transformOptions.package.threevot.domain ) route = transformOptions.package.threevot.domain
	else route = production + "/" + transformOptions.user.user_name + "/" + transformOptions.package.name;
	
	if(!transformOptions.promptValues.production) route += "_" + transformOptions.version
	body = _3vot.replaceAll(body, transformOptions.placeholder || placeholder, route);
	return body;
}

function readByType(path, transform, transformOptions){
	var body;
  if( path.indexOf(".js") > -1 || path.indexOf(".css") > -1 || path.indexOf(".html") > -1){
  	body = fs.readFileSync(path,"utf-8")
  	if(transform) body = Transform[transform](body, transformOptions)
  }
  else body = fs.readFileSync(path)
  return body;
}


module.exports = {
	toLocal: toLocal,
	toProduction: toProduction,
	readByType: readByType
}