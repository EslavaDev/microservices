const {Post, User} = require('./models');


module.exports = class Controller{
  async fetchAll(){
    try{
      let records = await Post.fetchAll();
      return records.toJSON();
    }catch(ex){
      console.log(ex); 
      throw ex;
    }
  }

  async save(data, Rabbit){
    try{
      //console.log(data)
      let temp = data
      let obj;
      obj = (temp.body)? temp.body : null;
      if(temp.ids){
          console.log("entro aca, ",temp.ids)
          let user = await new User({'id': temp.ids.userId}).fetch();
          //let worker = await new User({'id': temp.ids.workerId}).fetch();
          if(user && typeof user != 'undefined'){
            Object.assign(obj, {userId: user.id});
        }else{
          return "Usuario ingresado no existe";
        }
      }else{
        return "Id no ingresados"; 
      }

      let records = await new Post(obj).save();
      console.log("records: ",records.attributes)
      //validar si en records llega un objeto dataValues si no se debe buscar la manera de enviar los datos
      Rabbit.createService(records.attributes)
      return records.toJSON();
    }catch(ex){
      console.log(ex); 
      throw ex;
    }
  }
}