const {
  fetchAllOptions,
  AuthOptions,
  removeOptions,
  saveOptions
} = require('./Options');
const {
  fetchAll,
  remove,
  Auth,
  save
} = require('./Controller');
module.exports.Init = function (server, ...params) {
  console.log(`the module User is loaded`);

  server.route({
    options: fetchAllOptions,
    path: "/api/user",
    method: "GET",
    handler: fetchAll
  });

  server.route({
    options: removeOptions,
    path: "/api/user/{id}",
    method: "DELETE",
    handler: remove
  });

  server.route({
    options:saveOptions,
    path: "/api/user/",
    method: "POST",
    handler: save
  });

  server.route({
    options: AuthOptions,
    path: "/api/user/login",
    method: "POST",
    handler: Auth
  });

}