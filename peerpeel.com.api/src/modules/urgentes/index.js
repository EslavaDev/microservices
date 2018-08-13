//URGENTS
const {fetchAllOptions, saveOptions, findByIdOption} =require('./Options');
const {fetchAll, save} = require('./Controller');
module.exports.Init = function(server, ...params){
    console.log(`the module Support is loaded`);

    server.route({
      options: saveOptions,
      path: "/api/urgentes/save",
      method: "POST",
      handler: save
    });

    server.route({
      options: fetchAllOptions,
      path: "/api/urgentes/fetchAll",
      method: "GET",
      handler: fetchAll
    })




}

