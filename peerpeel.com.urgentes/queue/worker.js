// ---------- funcion que se ejecutara cuando se envia a un usuario
const Controllers = require('../controllers');
const {Urgente} = require('../models');
module.exports = async function sendUser(msg, msgPrincipal, ch, mainChannel){
  let urgentesControllers = new Controllers();// hay que importarlo aqui para que lo reconozca
  if(!msg){ // verificamos si la cola aun existe
    mainChannel.ack(msgPrincipal)
  } else {
    let dataWorker = JSON.parse(msg.content.toString()).worker; // se obtiene la informacion de la cola
    let mainData = JSON.parse(msgPrincipal.content.toString()) // los datos de la cola principal
    let dataService = mainData.service
    let lastWorker = mainData.workers[mainData.workers.length-1] // obtenemos los datos del ultimo trabajador
    let ids = {
      userId: dataService.userId,
      workerId: dataWorker.id
    }
    await urgentesControllers.update(dataService, ids) // actualizamos el servicio para asignarle el worker y cambiarle el estado
    setTimeout(() => { // ponemos a correr el tiempo
      console.log("id dataservice: ", dataService)
      // consultamos si ya esta asigando el servicio
      new Urgente({id: dataService.id}).fetch().then((response) => {
        console.log(response.attributes)
        if(response.attributes.status == 3){ // por ahora sera 3 asumiento que el estado 1 del servicio es solicitado, el estado 2 es asignado, estado 3 aceptado
          console.log('-------------------- asignacion confirmada, saliendo de la cola')
          ch.deleteQueue(dataService.id.toString())
        } else {
          if(dataWorker.id == lastWorker.id){ // si el id de este trabajador es el mismo que el del array que obtuvimos del ultimo trabajador entonces no hay mas por tanto la cola debe acabar
            console.log('-------------------- last worker')
            ch.deleteQueue(dataService.id.toString()) // eliminamos la cola
          }else{
            console.log('-------------------- cambiando de worker')
            ch.ack(msg) // pasamos al siguiente dato en caso tal de que el servicio no se halla aceptado
          }
        }
      })
    }, 5000) // este es el tiempo en segundos
  }
}