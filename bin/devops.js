var prompt = require("prompt")
var Packs = require("3vot-cloud/utils/packs")
var Download = require("3vot-cloud/app/download")
var Upload = require("3vot-cloud/app/upload")
var Build = require("3vot-cloud/app/build")
var Log = require("3vot-cloud/utils/log")
var Path = require("path")
var Stats = require("3vot-cloud/utils/stats")
var WalkDir = require("3vot-cloud/utils/walk")
var Transform = require("../app/utils/transform")
var fs = require("fs")
var eco = require("eco")
var open = require("open");
var RunScript = require("../app/actions/run")

function run(){
  Log.info("<:> 3VOT DIGITAL CONTENT CLOUD :=)")
  Packs._3vot({}, false)
  .then( function(result){ return RunScript.run(result); } )
  .then( function(){ 
    Log.info("<:> 3VOT SCRIPT COMPLETE :=)")
    return Stats.track("devops:run" ) 
  })
  .then(function(){ process.exit() })
  .fail( function(err){  Log.error(err, "./bin/devops", 25 ); });
}


module.exports = {
  run: run
}