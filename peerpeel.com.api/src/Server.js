const hapi = require('hapi');
const chairo = require('chairo');
const Inert = require('inert');
const Vision = require('vision');
const path = require('path');
const Jwt = require('hapi-auth-jwt2');
const HapiSwagger = require('hapi-swagger');
const Swagger = require('./Swagger');
const { promisify, format  } = require('util');
const fs = require('fs');
const readDirAsync = promisify(fs.readdir);
const validatefn = require('./Auth');
var connect = require('./services/connect');

module.exports.Init = async function(config){

  const server = new hapi.Server({
    port: config.port,
    host: config.host
  });
  await server.register([
    Vision,
    Inert,
    Jwt
  ]);

  await server.register({
    plugin: HapiSwagger,
    options: Swagger
  })
  await server.register(chairo);
  server.seneca.
  client({
    port: 1111,
    type: "tcp",
    pin: "role:Categories"
  }). //conecction why microservice profiles
  client({
    port: 4000,
    type: "tcp",
    pin: "role:Urgentes"
  }). //conecction why microservice urgentes
  client({
    port: 5000,
    type: "tcp",
    pin: "role:Post"
  })

  server.auth.strategy('jwt', 'jwt', {
    key: config.jwtSecret,
    validate: validatefn,
    verifyOptions:{
        //ignoreExpiration: true,
        algorithms:['HS256'] 
    }
});

  server.route([{
    options:{
      cors:true
    },
    path: "/fetch",
    method: "GET",
    handler: async (req, reply) => {
      var headers = {
        'Authorization':req.headers.Authorization
    };

    console.log("_________________")
    //console.log(path)
    let response = await connect.petition('GET','127.0.0.1',3500,'/fetch',{},headers)

      return {response}
    }
  },
])


let modulesPath = path.join(__dirname, "modules");
let directories =  await readDirAsync(modulesPath);
directories.forEach((dirName, index)=>{
    let dirPath = path.join(modulesPath,dirName);
        if(fs.statSync(dirPath).isDirectory()){
            require(dirPath).Init(server, config);
        }
})

  await server.start();
  console.log(`the server is runing at ${server.info.port}`)

};