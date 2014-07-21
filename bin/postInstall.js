console.log("Reseting User")

var packs = require("3vot-cloud/utils/packs")

packs.spawn(["set","3vot",'{"users":{"guest":{"email":"guest@3vot.com","public_dev_key":"guest","user_name":"guest"}}}'])
