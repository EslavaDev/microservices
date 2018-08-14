//POST
const {fetchAllOptions, saveOptions, findByIdOption, updateOptions} =require('./Options');
const {fetchAll, save, update} = require('./Controller');
module.exports.Init = function(server, ...params){
    console.log(`the module Post is loaded`);

    server.route({
      options: saveOptions,
      path: "/api/post/save",
      method: "POST",
      handler: save
    });

    server.route({
      options: updateOptions,
      path: "/api/post/acceptPost",
      method: "PUT",
      handler: update
    });

    server.route({
      options: fetchAllOptions,
      path: "/api/post/fetchAll",
      method: "GET",
      handler: fetchAll
    })




}