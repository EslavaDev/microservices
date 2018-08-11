const {Urgente,UrgenteC, User} = require('./models');

module.exports = class Controller{
  async fetchAll(){
    try{
      let records =  await UrgenteC.forge().fetch({withRelated: ['user', 'worker']});
      return records.toJSON();
    }catch(ex){
      console.log(ex); 
      throw ex;
    }
  }
  async findById(id){
    try{
      console.log('id que llega desde worker',id)
      let data = new Urgente(id)
  .fetch()
  .then(function(model) {
    // outputs 'Slaughterhouse Five'
     return model.attributes
  });

      return await data;
    }catch(ex){
      console.log(ex); 
      throw ex;
    }
  }
  async save (data, Rabbit) {
    try{
      let temp = data, user;
      let obj;
      let client
      obj = (temp.body)? temp.body : null;
      if(obj){
        if(temp.ids){
          console.log("entro aca, ",temp.ids)
          let user = await new User({'id': temp.ids.userId}).fetch();
          client = user.attributes
          //let worker = await new User({'id': temp.ids.workerId}).fetch();
          if(user && typeof user != 'undefined'){
            Object.assign(obj, {userId: user.id});
        }else{
          return "Usuario ingresado no existe";
        }
      }else{
        return "Id no ingresados"; 
      }
      let records = await Urgente.forge(obj).save();
      let workers = User.where({
        workerFilesStatus: 1,
        connected: 1,
        status: 1
      }).fetchAll().then(res => res.toJSON())
      .then( worker => Rabbit.createService(client,worker, records.attributes))
        await  console.log("workers: ",workers)
      //console.log("result: data values", records.attributes)
     // console.log("result:", records)
      
        return await records.toJSON()
      }else{
        return "Ingrese un servicio valido"
      }

    }catch(e){
      console.log(e); 
      throw e;
    }

  }
  async update (urgent, temp ) {
    try{
      let user, worker;
      if(urgent){
        if(temp){
          console.log("este es el pedido urgente",urgent)
          //console.log("entro aca, ",temp)
          if(temp.userId)
            user = await new User({'id': temp.userId}).fetch();
          if(temp.workerId)
            worker = await new User({'id': temp.workerId}).fetch();

          //let worker = await new User({'id': temp.ids.workerId}).fetch();
          if(user && typeof user != 'undefined'){
            Object.assign(urgent, {userId: user.id});
            if (worker && typeof worker != 'undefined'){
              Object.assign(urgent, {workerId: worker.id});
            }
        }else{
          return "Usuario ingresado no existe";
        }
      }else{
        return "Id no ingresados"; 
      }
        const existingClasif = await new Urgente({'id': urgent.id}).fetch();
        //console.log(urgent);
        if (existingClasif !== null) {
          const updated = await Urgente.forge({id:urgent.id, update_at: urgent.update_at, workerId: urgent.workerId}).save();
          if(updated){
            let data = await new Urgente({'id': urgent.id}).fetch();
            return data.attributes;
          }else{

            return existingClasif.attributes;
          }
        }else{
          return "Urgente no existe"
        }
      }else{
        return "Ingrese un servicio valido"
      }

    }catch(e){
      console.log(e); 
      throw e;
    }

  }
}