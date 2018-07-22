const hapi = require('hapi');
const chairo = require('chairo');


(async()=>{

  const server = new hapi.Server({
    port: 8080
  });
  await server.register(chairo);
  server.seneca.
                client({port:3000, type:"tcp", pin:"role:Profiles"}).  //conecction why microservice profiles
                client({port:4000, type:"tcp", pin:"role:Urgentes"})   //conecction why microservice urgentes

  server.route([{
    path:"/api/profiles/fetchAll",
    method:"GET",
    handler: (req,reply)=>{
      return reply.act({
        role:"Profiles",
        cmd:"fetchAll",
        payload: null
      })
    }
  },
  {
    path:"/api/urgentes/fetchAll",
    method:"GET",
    handler: (req,reply)=>{
      return reply.act({
        role:"Urgentes",
        cmd:"fetchAll",
        payload: null
      })
    }
  }])  
  await server.start();
  console.log(`the server is runing at ${server.info.port}`)

})();