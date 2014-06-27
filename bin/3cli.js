#!/usr/bin/env node

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

_3Model.Model.host = "http://threevot-api.herokuapp.com/v1"

console.log("-- 3VOT DIGITAL CONTENT CLOUD --")

Stat.setup("53ac8179d97b856681000000","b58de1794216364dc655f61975b7879b20c2e201c815da5e493175dd2f74b9c92f3ad29b1480640fa6a27e89be0e534e9d204b56b55c50e26cd7cd86452947bdbb10c341913e2061e0396562e3c61215671396d6e73cea908f5591e332980b8ca873d463576f4921bb76a5e6fdd8856f")

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
