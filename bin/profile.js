var prompt = require("prompt")
var Setup = require("../app/actions/profile_setup")
var Create = require("3vot-cloud/app/create")
var Path= require("path")
var Stats = require("3vot-cloud/utils/stats")
var Log = require("3vot-cloud/utils/log")

function setup(callback){
  var options = [ 
    { name: 'public_dev_key', description: 'Developer Key: ( Your Developer Key provided by the 3VOT Admin )' } 
  ];
  
  prompt.start();
  prompt.get( options, function (err, result) {
    Setup(result)
    .then( function(){ Log.info("3VOT was correctly setup and it's ready to use.") } )
    .then( function(){ return Stats.track("site:setup", {kind: "new developer "}) } )
    .then( function(){ if(callback) return callback(); })
    .fail( function(err){ Log.error(err, "./prompt/profile",43); } );
  });
}

function create(callback){
  prompt.start();
  prompt.get( [ 
    { name: 'user_name', description: 'Profile Name: ( only lowercase letters, numbers and lowerdash _ )' }, 
    { name: 'email', description: 'Email: ' }],
    function (err, result) {
      result.name = "";
      Log.setUsername(result.user_name)
      Log.info("<:> 3VOT DIGITAL CONTENT CLOUD :=)")
      Create(result)
      .then( Setup )
      .then( function(promptOptions){
        Stats.track( "register",result )
        Log.info("3VOT created your profile and it's ready to use.")
        Log.info( ( "Now go to the project folder: cd 3vot_" + result.user_name ).bold )
        if(callback) return callback(result);
      })
    .fail( function(err){  Log.error(err, "./prompt/profile",43); });
  });
}

module.exports = {
  setup: setup,
  create: create
}