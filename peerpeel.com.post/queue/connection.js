const amqp = require('amqplib/callback_api') // importo la libreria que funciona con el rabbit
const sendUser = require('./worker')

// variables que seran necesarias luego
let rabbitConn
let channelPri
      

const rabbitOptions = {
  protocol: 'amqp',
  hostname: '31.220.55.37',
  port: 5672,
  username: 'admin',
  password: 'd3v3l0p3r',
  locale: 'en_US',
  frameMax: 0,
  heartbeat: 0,
  vhost: '/',
}

//se ejecuta la conexion
module.exports.connect = function rabbitCon () {
  amqp.connect(rabbitOptions, function (err, conn) {
    rabbitConn = conn
    if (!err) {
      conn.createChannel(function (err, ch) { // creacion del canal - es necesario un canal para crear las colas
        if(!err){
          channelPri = ch
          let q = 'posts' // nombre de la cola
          let ex = 'posts_ex'; 
          let route = 'post_services' // enrutamiento para que las colas sepan a que canal ir  
          ch.assertExchange(ex, 'direct', {durable: false}); //
          ch.prefetch(100);    // cuantas colas maneja al tiempo
          ch.assertQueue(q, {exclusive: false, durable:false}, function(err, q) { // creacion de la cola y sus caracteristicas
            if (!err) {
              console.log('escuchando servicios') // para saber si esta escuchando
              ch.bindQueue(q.queue, ex, route) // se le asigna a la cola un nombre, una ruta 
              ch.consume(q.queue, (msg)=>{
                console.log(" [x] Servicio recibido       ",msg );
              }, { // esto se ejecuta cuando le llega algo al canal aqui se define (nombre de cola, funcion a realizar, si mata el proceso)
                noAck: false
              });
            } else {
              console.log(err)
            }
          });
        } else {
          console.log(err)
        }
      });
    } else  {
      console.log(err)
    }
  });
}

module.exports.createService = function createService (data){ // para poder usar las variables que tenemos aca sin tener que exportarlas
  console.log(data)
  channelPri.publish('posts_ex', 'post_services', new Buffer(JSON.stringify({ // hacemos la publicacion para que el rabbit la atrape, especificamos a que cola debe que ir y su etiqueta
    service: data
  })));
}

/*
// funcion que se realizara apenas llegue una urgencia
function consumeMessage (msg){
    let dataQueue = JSON.parse(msg.content.toString()); // se obtiene la informacion de la cola
    let dataService = dataQueue.service
    console.log('info servicio', dataService)

    let msgPrincipal = msg // msg contiene una serie de atributos que necesitara rabbit mas adelante
    let q = dataService.id // las colas deben ser unicas por lo cual les damos el id del servicio 
    let chPush
      
    console.log(" [x] Servicio recibido");
    rabbitConn.createChannel(function (err, ch){ // dado que el servicio le llegara a varios usuarios en necesario crear otro canal que administre eso
      if(!err){
        chPush = ch
        ch.assertExchange('usuarios', 'direct', {durable: false});
        ch.prefetch(1); // se lo enviara a un worker por vez
        ch.assertQueue(q.toString(), { exclusive: false, durable:false }, function(err, q) {
          ch.bindQueue(q.queue, 'usuarios', 'push_usuarios')
          ch.consume(q.queue, function(msg){
            sendUser(msg, msgPrincipal, ch, channelPri) // le envio datos que  podrian ser necesarios
          }, {
            noAck: false
          });
        });
      }else{
        console.log(err)
      }
    }) 
    
    setTimeout(function(){ // darle tiempo al channel de crearse
      dataWorkers.map((worker) => {
        console.log(worker)
        chPush.publish('usuarios', 'push_usuarios', new Buffer(JSON.stringify({ // publico un mensaje, es decir, le envio una notificacion al canal que acabo de crear
          worker: worker, // informacion del worker que atendera
        })));
      })
    },3000)
}
*/