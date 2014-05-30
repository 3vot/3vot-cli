#!/usr/bin/env node
require("coffee-script/register")

var argv = require('optimist').argv
var Path = require('path')
var prompt = require("prompt")
var fs = require("fs")
var Q = require("q")
var colors = require('colors')
var _3Model = require("3vot-model")

var Profile = require("./profile")
var App = require("./app")
var Server = require("../app/actions/server")
var Log = require("3vot-cloud/utils/log")
var Stat = require("3vot-cloud/utils/stats")

Log.setLevel("INFO")

//_3Model.Model.host = "http://localhost:3002/v1"

_3Model.Model.host = "http://threevot-api.herokuapp.com/v1"

Log.debug("LOAD PACKAGE CAN INCLUDE OPTIONS TO LOAD 3VOT or APP PACKAGE AUTOMATICALLY AND DONT DO IT IN ACTIONS", "bin/cli", 36)
console.log("-- 3VOT DIGITAL CONTENT CLOUD --")

// *****************
// CLI
// *****************
var callback = function(){
  Log.info("---- 3VOT ----")
}

if(argv.d){
  Log.setLevel("DEBUG2")
}

if(argv.l){
  _3Model.Model.host = "http://localhost:3002/v1"
}

if(argv.v){
  var pathToPackage =  Path.join(Path.dirname(fs.realpathSync(__filename)), '../package.json')

  var pck  = require(pathToPackage)
  console.log(pck.version)
}
else if( argv.h ){
  var pkg = require("../package.json")
  var help = [
    "",
    "Usage: 3vot [options] [command]",
    "",
    "Commands:",
    "",
    "  register               Registers to user 3VOT CLI",
    "",
    "  setup                  Builds the project folder and installs all dependencies",
    "",
    "  create                 Creates a new javascript app",
    "",
    "  download               Downloads a starting point App",
    "",
    "  server                 Starts a development server",
    "",
    "  upload                 Uploads and publishes the app to the web",
    "",
    "  build                  Builds the development version of the app (used in manual operations)",
    "",
    "  install                Installs the NPM and Bower dependencies of the app (used in manual operations)",
    "",
    
    "Utilities:",
    "",
    "--app appname            Used as an alternative to typing App Name in a prompt.",
    "",
    " -d                      Runs the specified command in debug mode, showing all console outputs",
    "",
    "Options:",

    "  -h                     help information",
    "  -v                     output the version number"

  ].join("\n")
  console.log( help );
}
else{

  
  if( argv._.indexOf("setup") > -1 ){ Profile.setup(); } 

  else if( argv._.indexOf("register") > -1 ){ Profile.create(); }

  else if( argv._.indexOf("create") > -1 ){ App.template( argv.app ); }

  else if( argv._.indexOf("upload") > -1 ){ App.upload( argv.app ); }

  else if( argv._.indexOf("download") > -1 ){ App.download( argv.app ); }

  else if( argv._.indexOf("publish") > -1 ){ App.publish( argv.app ); }

  else if( argv._.indexOf("build") > -1 ){ App.build( argv.app ); }

  else if( argv._.indexOf("install") > -1 ){ App.install( argv.app ); }

  else if( argv._.indexOf("server") > -1 ){ Server.prompt( ); }

  else{
    
    Log.info("Command not found: Use 3vot -h for help", "bin/3cli", 124)

  }
}
