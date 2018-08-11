const hapi = require('hapi');
const chairo = require('chairo');
const Inert = require('inert');
const Vision = require('vision');
const Jwt = require('hapi-auth-jwt2');
const Boom = require('boom');
const HapiSwagger = require('hapi-swagger');
const {
  User
} = require('./models');
const {
  Server
} = require('./config');
const Swagger = require('./Swagger');
const validatefn = require('./Auth');
const UrgentOp = require('./Options/urgents');
const UserOp = require('./Options/users');
const { 
  fetchAll, 
  remove, 
  save, 
  update
} = require('./Controller');
const Utilities = require('./Utilities');

(async () => {

  const server = new hapi.Server({
    port: Server.port
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
    {
      options: UrgentOp.fetchAllOptions,
      path: "/api/urgentes/fetchAll",
      method: "GET",
      handler: (req, reply) => {
        return reply.act({
          role: "Urgentes",
          cmd: "fetchAll",
          payload: null
        })
      }
    },
    {
      options: UrgentOp.saveOptions,
      path: "/api/urgentes/save",
      method: "POST",
      handler: (req, reply) => {
        console.log('payload', req.payload)
        let payload = req.payload
        return reply.act({
          role: "Urgentes",
          cmd: "save",
          payload
        })
      }
    }
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

  server.route({
    options:UserOp.fetchAllOptions,
    path: "/api/staff", 
    method: "GET", 
    handler: fetchAll
});

server.route({
    path: "/api/staff/{id}", 
    method: "DELETE", 
    handler: remove
});

server.route({
    options:UserOp.AuthOptions,
    path: "/api/staff", 
    method: "POST", 
    handler:  async(request, reply) =>{
        try{
          
            let user = await new User(request.payload).fetch()
            if(!user){
                return console.error('no autorizado');
                
            }
            return Utilities(user);
        }catch(error){
            return console.error(error);
        }
    }
});

  await server.start();
  console.log(`the server is runing at ${server.info.port}`)

})();