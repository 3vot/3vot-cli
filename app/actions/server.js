var Q = require("q");

var express = require('express');
var fs = require("fs");
var Path = require("path");
var http = require('http');
var https = require('https');
var url = require("url");
var prompt = require("prompt")
var argv = require('optimist').argv;
var request = require("superagent")
var devDomain = null;
var Transform = require("../utils/transform")
var Vot = require("./vot")

var extend = require('util')._extend

var mime = require('mime');

var Server = {}
var WalkDir = require("3vot-cloud/utils/walk")
var AppBuild = require("3vot-cloud/app/build")
var Packs = require("3vot-cloud/utils/packs")
var rimraf = require("rimraf")
var Log = require("3vot-cloud/utils/log")

var open = require("open");

var User;
var port = 3000;

module.exports = Server;

Server.prompt =  function( userPort ){
  if(userPort) port = userPort;
  prompt.start();
  Server.domain = "localhost:" + port
  Log.debug("starting server in localhost:" + port,"server",32)
  Server.startServer()
  open("http://localhost:" + port);
};

Server.startServer = function(){
  var app = express();    
  
  app.set('port', port);
  app.disable('etag');
  app.enable('strict routing');
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());

  app.use("/vot", Vot );

  app.use(app.router);

  app.get("/", function(req, res) {
    middleware(req,res)
  });

  app.get("/*", function(req, res) {
    var options = Packs.package({},false);
    var file = req.params[0];

    var filePath = Path.join(  process.cwd(), options.threevot.distFolder, file );

    fs.stat(filePath, function(err,stats){

      if(err) return res.send(404);
      if(!stats.isFile()) return res.send(404);
      var fileBody = Transform.readByType(filePath, "local", {port: port} )
      res.set('Content-Type', mime.lookup(filePath));
      res.send(fileBody);
    });
  });

  http.createServer(app).listen(app.get('port'), function(){
    console.info('3VOT Server running at: http://' + Server.domain );
  });

}

function middleware(req, res) {
  var options;

  preHook()
  .then( function(){ return Packs.get({},false) } )
  .then( function(result){ options=result; return buildApp(result); } )
  .then( postHook )
  .then(function(){
    var filePath = Path.join(  process.cwd(), options.package.threevot.distFolder, "index.html" );
    var fileBody = Transform.readByType(filePath, "local", {port: port});
    res.set('Content-Type', mime.lookup(filePath));
    return res.send(fileBody);
  })
  .fail(function(err){
    res.send( err.stack || err.toString());
  })
};

function buildApp(options){
  var deferred = Q.defer();
  Log.debug(options.package.name,"server",95)

  AppBuild( options )
  .then( function(){
    return deferred.resolve(options.package.name);
  })
  .fail( function(err){ 
    return deferred.reject(err);
  });

  return deferred.promise;
};

function transformHook(app_name, body, file){

    try{
      var prePath = Path.join(  process.cwd(), "hooks" ,"transform.js" );

      if( fs.existsSync(prePath) ){
        return require(prePath)(body,file);
      }
      else return body;

    }catch(err){ 
      Log.debug(err,"server",164)
      return body;
    }
    return body;
}

function preHook(){
  var deferred = Q.defer();

    var prePath = Path.join(  process.cwd(), "hooks" ,"pre.js" );

    fs.exists(prePath, function(exists){
      if(!exists) return deferred.resolve()

      var exec = require('child_process').exec,child;

      child = exec('node ' + prePath, function (error, stdout, stderr) {
        if (error !== null){
          Log.debug(error, "server:146");
        }
        Log.debug(stdout, "server:146");
        return deferred.resolve()
      });
    });

  return deferred.promise;
}


function postHook(){
  var deferred = Q.defer();

    try{
      var prePath = Path.join(  process.cwd(), "hooks" ,"post.js" );

      if( fs.existsSync(prePath) ){

        var exec = require('child_process').exec,child;

        child = exec('node ' + prePath,
        function (error, stdout, stderr) {

          if (error !== null){
            Log.debug(error, "server:194");
          }
          Log.debug(stdout, "server:196");
          return deferred.resolve()
        });
      }
      else  return deferred.resolve()

    }catch(err){ return deferred.resolve() }

    return deferred.promise;
}

