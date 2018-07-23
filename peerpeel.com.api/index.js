const hapi = require('hapi');
const chairo = require('chairo');


(async()=>{

  const server = new hapi.Server({
    port: 8080
  });
  await server.register(chairo);
  server.seneca.
                client({port:3000, type:"tcp", pin:"role:Profiles"}).  //conecction why microservice profiles
                client({port:4000, type:"tcp", pin:"role:Urgentes"}).   //conecction why microservice urgentes
                client({port:5000, type:"tcp", pin:"role:Post"}) 
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
  server.route(
    {
      path:"/api/post/save",
      method:"POST",
      handler: (req,reply)=>{
        let payload = req.payload
        return reply.act({
          role:"Post",
          cmd:"save",
          payload
        })
      }
    }) 
  await server.start();
  console.log(`the server is runing at ${server.info.port}`)

})();