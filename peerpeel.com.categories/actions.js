const Controllers = require('./controllers');

module.exports = function Controller(options){
  let categoryControllers = new Controllers();
  this.add("role:Categories, cmd:fetchAll", async(msg,reply) =>{
    try{
      let category = await categoryControllers.fetchAll();
      //reply recibe como primer valor un error y el regundo la respuesta
      reply(null,{response:category});  
    }catch(err){
      reply(err);
    }
  });
  this.add("role:Categories, cmd:save", async(msg,reply) =>{
    try{
      let data = msg.payload
      return categoryControllers.save(data)
      .then(res =>reply(null,{response:res}))
      .catch(err => reply(err));
    }catch(err){
      //console.log("entro al error")
      reply(err);
    }
  });
}