//POST
const {fetchAllOptions, saveOptions} =require('./Options');
const {fetchAll, save} = require('./Controller');
module.exports.Init = function(server, ...params){
    console.log(`the module Category is loaded`);

    server.route({
      options: saveOptions,
      path: "/api/category",
      method: "POST",
      handler: save
    });

    server.route({
      options: fetchAllOptions,
      path: "/api/category",
      method: "GET",
      handler: fetchAll
    })




}