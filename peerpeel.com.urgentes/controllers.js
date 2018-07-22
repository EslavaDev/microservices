const {Urgentes} = require('./models');

module.exports = class Controller{
  async fetchAll(){
    try{
      let records = await Urgentes.fetchAll();
      return records.toJSON();
    }catch(ex){
      console.log(ex); 
      throw ex;
    }
  }
}