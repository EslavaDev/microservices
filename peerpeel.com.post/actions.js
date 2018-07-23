const Controllers = require('./controllers');
const rabbit = require('./queue/connection')
const rabbitCon = rabbit.connect()

module.exports = function Controller(options){
  let postControllers = new Controllers();
  this.add("role:Post, cmd:fetchAll", async(msg,reply) =>{
    try{
      let post = await postControllers.fetchAll();
      //reply recibe como primer valor un error y el regundo la respuesta
      reply(null,{response:post});  
    }catch(err){
      reply(err);
    }
  });
  this.add("role:Post, cmd:save", async(msg,reply) =>{
    try{
      let data = msg.payload
      let post = await postControllers.save(data,rabbit)
      reply(null,{response:post});
    }catch(err){
      //console.log("entro al error")
      reply(err);
    }
  })
}