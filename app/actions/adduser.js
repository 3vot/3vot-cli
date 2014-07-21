var Q = require("q");
var Profile = require("3vot-cloud/models/profile")
var Log = require("3vot-cloud/utils/log")
var Packs = require("3vot-cloud/utils/packs")

promptOptions = {
  public_dev_key: null,
  users: null,
}

tempVars = {
  profile: null
}

module.exports = execute;

function execute(options){
  promptOptions = options;
  var deferred = Q.defer();

  getProfile()
  .then(function(result){ return saveuser(result) } )
  .then( deferred.resolve )
  .fail( deferred.reject )

  return deferred.promise;
}

function getProfile(){
  var deferred = Q.defer();
  
  callbacks = {
    done: function(profile){
      if(!profile.user_name) return deferred.reject("No User found with provided Key")
      Log.user_name = profile.user_name
      promptOptions.promptValues.user_name = profile.user_name;
      tempVars.profile = profile
      return deferred.resolve(profile);
    },
    fail: function(err){
      return deferred.reject(err);
    }
  }
  Profile.callView( "authenticate", { public_dev_key: promptOptions.promptValues.public_dev_key }, callbacks )
  
  return deferred.promise;
}

function saveuser(){
  promptOptions.user.users = promptOptions.user.users || {};
  promptOptions.user.users[promptOptions.promptValues.user_name] = promptOptions.promptValues;
  return Packs.set(promptOptions.user);

}
