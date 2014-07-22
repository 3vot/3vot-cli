var prompt = require("prompt")
var Register = require("3vot-cloud/app/register")
var Path= require("path")
var Stats = require("3vot-cloud/utils/stats")
var Log = require("3vot-cloud/utils/log")
var Packs = require("3vot-cloud/utils/packs")
var AddUser = require("../app/actions/adduser")
var RemoveUser = require("../app/actions/removeuser")
var EnvSetup = require("../app/actions/envSetup");

function setup(callback){
  var options = [ 
    { name: 'app_name', description: 'App Name: ( Give your app a unique name within your profile )' } ,
    { name: 'build', description: 'Use 3VOT Build Feature: ( y/n )' } ,
    { name: 'dist', description: 'Distribution Folder: ( hit enter for "dist"  )' } 
  ];
  
  prompt.start();
  prompt.get( options, function (err, result) {

    EnvSetup(result)
    .then( function(){ Log.info("3VOT was correctly setup and it's ready to use.") } )
    .then( function(){ return Stats.track("site:setup", {kind: "new developer "}) } )
    .then(function(){ process.exit() })
    .fail( function(err){ Log.error(err, "./prompt/profile",43); } );
  });
}

function addUser(){
  var options = [ 
    { name: 'email', description: 'Developer Email: ( Your Email used for administration )' } ,  
    { name: 'public_dev_key', description: 'Developer Key: ( Your Public Developer Key )' } 
  ];
  
  prompt.start();
  prompt.get( options, function (err, result) {

    Packs.get(result, false)
    .then( AddUser )
    .then( function(){ Log.info("User added correctly and it's ready to use.") } )
    .then( function(){ return Stats.track("profile:adduser") } )
    .then(function(){ process.exit() })
    .fail( function(err){ Log.error(err, "./prompt/profile",43); } );
  });
}

function removeUser(){
    Packs.get({},false)
    .then( RemoveUser )
    .then( function(){ Log.info("User removed correctly and it's ready to use.") } )
    .then( function(){ return Stats.track("profile:removeuser") } )
    .then(function(){ process.exit() })
    .fail( function(err){ Log.error(err, "./prompt/profile",43); } );
}

function listUser(){
  Packs.get({}, false)
  .then( function(options){
    if(!options.user || !options.user.users || options.user.users.length == 0 ) return Log.info("No users found, use 3vot adduser")

    for(user in options.user.users){
       console.log(user + " : " + options.user.users[user].email );
     }
  })  
  .fail( function(err){ Log.error(err, "./prompt/profile",43); } );
}

function register(callback){
  prompt.start();
  prompt.get( [ 
    { name: 'user_name', description: 'Profile Name: ( only lowercase letters, numbers and lowerdash _ )' }, 
    { name: 'email', description: 'Email: ' }],
    function (err, result) {
      result.name = "";
      Log.setUsername(result.user_name)
      Log.info("<:> 3VOT DIGITAL CONTENT CLOUD :=)")
      Register(result)
      .then( function(tempVars){
        result.public_dev_key = tempVars.public_dev_key;
        return Packs.get(result, false);
      })
      .then( AddUser )
      .then( function(){
        Stats.track( "register",result )
        Log.info("3VOT created your profile and it's ready to use.")
      })
    .then(function(){ process.exit() })
    .fail( function(err){  Log.error(err, "./prompt/profile",43); });
  });
}

module.exports = {
  setup: setup,
  register: register,
  addUser: addUser,
  removeUser: removeUser,
  listUser: listUser
}