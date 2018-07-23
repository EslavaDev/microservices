const {Post} = require('./models');


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
      let temp = JSON.parse(data.payload)


      let records = await new Post(temp).save();
      //validar si en records llega un objeto dataValues si no se debe buscar la manera de enviar los datos
      Rabbit.createService(workers, records.dataValues)
      return records.toJSON();
    }catch(ex){
      console.log(ex); 
      throw ex;
    }
  }
}