const {Categories} = require('./models');


module.exports = class Controller{
  async fetchAll(){
    try{
      let records = await Categories.forge().fetch();
      return records.toJSON();
    }catch(ex){
      console.log(ex); 
      throw ex;
    }
  }

  save(data){
    return new Promise((resolve, reject)=>{
    if (data){
      return new Categories(data).save()
      .then(res =>{
        return resolve(res.toJSON());
      })
      .catch(err => {
        return reject({status:404, error: err, message:'error al crear la categoria'});
      });
    }else{
      return reject({status:400,message:'error, no haz ingresado la data'});
    }
    });
  }
}