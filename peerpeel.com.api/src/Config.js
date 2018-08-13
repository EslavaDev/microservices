const path = require("path");
const nconf = require("nconf");

const configProvider = new nconf.Provider({
    env: true,
    store:{
        type: "file",
        file: path.join(__dirname,`./../config/config.${process.env.NODE_ENV || "dev" }.json`)
    }
});


module.exports.getServerConfig = ()=>{
    return configProvider.get("server");//mapping the JSON object to IServerCOnfig interface
}

 module.exports.getDatabaseConfig= ()=>{
    return configProvider.get("database");//mapping the JSON object to IServerCOnfig interface
}