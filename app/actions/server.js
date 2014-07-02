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

var mime = require('mime');

var Server = {}
var Builder = require("3vot-cloud/utils/builder");
var WalkDir = require("3vot-cloud/utils/walk")
var AppBuild = require("3vot-cloud/app/build")
var rimraf = require("rimraf")

var Log = require("3vot-cloud/utils/log")

module.exports = Server;

Server.prompt =  function( isNitrous ){
  prompt.start();
  Server.domain = "localhost:3000"
  Server.startServer()
};

Server.startServer = function(){
  var app = express();    
  var pck = require( Path.join( process.cwd(), "3vot.json" )  );
  var profile = pck.user_name;

  app.set('port', 3000);
  app.disable('etag');
  app.enable('strict routing');
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);

  app.get("/", function(req,res){
    res.send("<h1>Congratulations 3VOT Local Server is Running</h1><h2>Now head to your app @ <a href='http://localhost:3000/APP_NAME'>http://localhost:3000/APP_NAME</a></h2>");
  });

  app.get("/:app_name/:file", function(req, res) {
    var asset = req.params.asset;
    var app_name = req.params.app_name;
    var file = req.params.file;
    
    var filePath = Path.join(  process.cwd() , "apps", app_name, "app", file );
    var fileBody = Transform.readByType(filePath, "local", {app_name: app_name} );
    res.set('Content-Type', mime.lookup(filePath));
    res.send(fileBody);
  });

  app.get("/:app_name/assets/:asset", function(req, res) {
    var asset = req.params.asset;
    var app_name = req.params.app_name;
    var filePath = Path.join(  process.cwd() , "apps", app_name, "app", "assets", asset );
    var fileBody = Transform.readByType(filePath, "local", {app_name: app_name});
    res.set('Content-Type', mime.lookup(filePath));
    res.send(fileBody);
  });

  app.get("/:app_name", function(req, res) {
    var app_name = req.params.app_name
    res.redirect("/" + app_name + "/")
  });

  app.get("/:app_name/", function(req, res) {
    var app_name = req.params.app_name
    middleware(app_name,req,res)
  });

  http.createServer(app).listen(app.get('port'), function(){
    console.info('3VOT Server running at: http://' + Server.domain );
  });

}

function middleware(app_name,req, res) {
  checkApp(app_name)
  .then(clearAppFolder)
  .then(preHook)
  .then(buildApp)
  .then(function(){
    var filePath = Path.join(  process.cwd() , "apps", app_name, "app", "index.html" );
    var fileBody = Transform.readByType(filePath, "local", { app_name: app_name });
    res.set('Content-Type', mime.lookup(filePath));
    return res.send(fileBody);
  })
  .fail(function(err){
    res.send( err.stack || err.toString());
  })
};

function checkApp(app_name){
  var deferred = Q.defer();
  process.nextTick(function(){
    try{
      app_package = require(Path.join(  process.cwd() , "apps", app_name, "package.json") );
      deferred.resolve(app_name)
    }catch(err){
      Log.error(err, "actions/server", 154)
      deferred.reject("App " + app_name + " Not found in ")
    } 
  });
  return deferred.promise; 
}

function clearAppFolder(app_name){
  var deferred = Q.defer();
  var path = Path.join( process.cwd(), 'apps', app_name, 'app' );
  rimraf(path, function(err){
    fs.mkdirSync(path);
    fs.mkdirSync( Path.join(path,"assets") );
    return deferred.resolve(app_name);
  })

  return deferred.promise;
}

function buildApp(app_name){
  var deferred = Q.defer();

  Log.debug(app_name,"server",132)

  AppBuild( app_name, "localhost", false, Server.domain )
  .then( function(){
    return deferred.resolve(app_name);
  })
  .fail( function(err){ 
    //Log.error(err, "actions/server", 164); 
    console.log("****************")
    return deferred.reject(err);
  });

  return deferred.promise;
};


function preHook(app_name){
  var deferred = Q.defer();

    try{
      var prePath = Path.join(  process.cwd() , "apps", app_name, "hooks" ,"pre.js" );

      if( fs.existsSync(prePath) ){

        var exec = require('child_process').exec,child;

        child = exec('node ' + prePath,
        function (error, stdout, stderr) {

          if (error !== null){
            Log.debug(error, "server:146");
          }
          Log.debug(stdout, "server:146");
          return deferred.resolve(app_name)
        });
      }
      else  return deferred.resolve(app_name)

    }catch(err){ return deferred.resolve(app_name) }

    return deferred.promise;
}

