const Controllers = require('./controllers');


module.exports = function Controller(options){
  let urgentesControllers = new Controllers();
  this.add("role:Urgentes, cmd:fetchAll", async(msg,reply) =>{
    try{
      let urgentes = await urgentesControllers.fetchAll();
      reply(null,{response:urgentes});
    }catch(err){
      reply(err);
    }
  })
}