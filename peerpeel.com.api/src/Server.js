const hapi = require('hapi');
const chairo = require('chairo');
const Inert = require('inert');
const Vision = require('vision');
const Jwt = require('hapi-auth-jwt2');
const HapiSwagger = require('hapi-swagger');
const Swagger = require('./Swagger');
const validatefn = require('./Auth');

module.exports.Init = async function(config){

  const server = new hapi.Server({
    port: config.port,
    host: '31.220.55.37'
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
    port: 3000,
    type: "tcp",
    pin: "role:Profiles"
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
    key: Server.jwtSecret,
    validate: validatefn,
    verifyOptions:{
        //ignoreExpiration: true,
        algorithms:['HS256'] 
    }
});

  server.route([{
      path: "/api/profiles/fetchAll",
      method: "GET",
      handler: (req, reply) => {
        return reply.act({
          role: "Profiles",
          cmd: "fetchAll",
          payload: null
        })
      }
    },
  ])
  server.route({
    path: "/api/post/save",
    method: "POST",
    handler: (req, reply) => {
      let payload = req.payload
      return reply.act({
        role: "Post",
        cmd: "save",
        payload
      })
    }
  })

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