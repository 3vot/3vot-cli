var fs = require("fs")
var _3vot = require("3vot/utils")

var placeholder = "{3vot}"
var local = "//localhost:3000";
var production = "//3vot.com"

var Transform = { local: toLocal, production: toProduction }

function fromS3(body){
	body = _3vot.replaceAll(body, "*/assets", "{3vot}/assets");
	return body;
}

function toLocal( body, transformOptions ){
	var route = (transformOptions.host || local ) + "/" + transformOptions.app_name;

	body = _3vot.replaceAll(body, transformOptions.placeholder || placeholder, route);
	return body;
}

function toProduction(body, transformOptions){
	var route = (transformOptions.host || production )+ "/" + transformOptions.user_name + "/" + transformOptions.app_name;
	if(transformOptions.version) route += "_" + transformOptions.version
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
	fromS3: fromS3,
	readByType: readByType
}