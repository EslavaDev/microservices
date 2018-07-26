const Controllers = require('./controllers');
const rabbit = require('./queue/connection')
const rabbitCon = rabbit.connect()

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
  this.add("role:Urgentes, cmd:save", async(msg,reply) =>{
    try{
      let data = msg.payload
      let urgentes = await urgentesControllers.save(data,rabbit)
      reply(null,{response:urgentes});
    }catch(err){
      //console.log("entro al error")
      reply(err);
    }
  })
}