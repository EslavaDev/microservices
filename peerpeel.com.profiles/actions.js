const Controllers = require('./controllers');

module.exports = function Controller(options){
  let profilesControllers = new Controllers();
  this.add("role:Profiles, cmd:fetchAll", async(msg,reply) =>{
    try{
      let profiles = await profilesControllers.fetchAll();
      reply(null,{response:profiles});
    }catch(err){
      reply(err);
    }
  })
}