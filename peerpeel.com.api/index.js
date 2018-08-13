const Server = require("./src/Server");
const { getServerConfig } = require("./src/Config");

(async function main(){
   let configServer = getServerConfig(); 
   console.log(configServer)
   await Server.Init(configServer);
})()