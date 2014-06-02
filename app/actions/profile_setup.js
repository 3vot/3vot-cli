var Path = require("path")
var fs = require("fs")
var Q = require("q");

var Profile = require("3vot-cloud/models/profile")

var AwsCredentials = require("3vot-cloud/aws/credentials");

var Log = require("3vot-cloud/utils/log")

var Packs = require("3vot-cloud/utils/packs")
var Install = require("3vot-cloud/utils/install")

var profile = {};

var promptOptions = {
  public_dev_key: null
}

var tempVars = {
  profile: null
}

function execute(options){
    var deferred = Q.defer();
    promptOptions = options;
    getProfile()
    .then( scaffold )
    .then( changeDir )
    .then( Install.installNPM )
    .then( function(){ process.chdir( Path.join( process.cwd(), ".." ) ); } )
    .then (function(){ return deferred.resolve(promptOptions) })
    .fail( function(err){ return deferred.reject(err) } );
    return deferred.promise;
  }

function getProfile(){
  var deferred = Q.defer();
  
  callbacks = {
    done: function(profile){
      Log.user_name = profile.user_name
      tempVars.profile = profile
      return deferred.resolve(profile);
    },
    fail: function(err){
      return deferred.reject(err);
    }
  }
  Profile.callView( "authenticate", { public_dev_key: promptOptions.public_dev_key }, callbacks )
  
  return deferred.promise;
  
}

function scaffold(){
    Log.debug("Scaffolding Projects", "actions/profile_setup", 52);
    var deferred = Q.defer();
    
    var options = {
      public_dev_key: tempVars.profile.security.public_dev_key,
      user_name: tempVars.profile.user_name,
      folder: "3vot_" + tempVars.profile.user_name
    }

    fs.mkdirSync( Path.join( process.cwd(), options.folder ));
    fs.mkdirSync( Path.join( process.cwd(), options.folder , "apps" ));
    fs.mkdirSync( Path.join( process.cwd(), options.folder , "apps", "dependencies" ));
    fs.mkdirSync( Path.join( process.cwd(), options.folder , "tmp" )) ;

    var templatesPath =  Path.join(Path.dirname(fs.realpathSync(__filename)), '../../node_modules/3vot-cloud/templates');
    var _3votJSON = {};
    var gitIgnore = fs.readFileSync(  Path.join( templatesPath, "_.gitignore" ), "utf-8");
    var pckJSON = require( Path.join( templatesPath, "package.json" ));

    _3votJSON.public_dev_key = tempVars.profile.security.public_dev_key;
    _3votJSON.user_name = tempVars.profile.user_name;

    fs.writeFileSync( Path.join(process.cwd(), options.folder, "3vot.json"), JSON.stringify(_3votJSON, null, '\t') );
    fs.writeFileSync( Path.join(process.cwd(), options.folder, "package.json"), JSON.stringify(pckJSON, null, '\t') );
    fs.writeFile( Path.join(process.cwd(), options.folder, ".gitignore"), gitIgnore, function(){ deferred.resolve( options )  } );

    return deferred.promise;
  }

function changeDir( options ){
  var deferred = Q.defer();
  var projectPath = Path.join( process.cwd() , options.folder );
  process.chdir( projectPath );

  process.nextTick(function(){
    deferred.resolve()
  })

  return deferred.promise;
}



function installNPM2(options){
  var deferred = Q.defer();
  var projectPath = Path.join( process.cwd() , options.folder );
  process.chdir( projectPath );

  try{
   var npm = require("npm");
   var projectPackage = require( Path.join(process.cwd(), "package.json") )

   var packs = []
   for(index in projectPackage.dependencies){
     packs.push(index+"@"+projectPackage.dependencies[index])
   }

    npm.load(npm.config, function (er) {
      if (er) return deferred.reject(er);
      npm.commands.install( projectPackage.dependencies , function (er, data) {
        if (er) return deferred.reject(er)
        restoreCWD()
        return deferred.resolve()
        // command succeeded, and data might have some info
      });
      npm.on("log", function (message) { })
    });
  }
  catch(e){
    Log.info("*** WARNING: ***")
    Log.info("PLEASE INSTALL NPM MANUALLY by running npm install");
    Log.debug2(e)
    restoreCWD()
    return deferred.resolve()
  }

  return deferred.promise;      
}

function restoreCWD(){
  var projectPath = Path.join( process.cwd() , ".." );
  process.chdir( projectPath );
}

module.exports = execute;