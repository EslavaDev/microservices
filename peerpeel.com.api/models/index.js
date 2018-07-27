const Bookshelf = require('../Database');
//se debe definir definir interfaz a cada modelo
/* interface IFilm{
    title: string,
    description: string
} */


const User = Bookshelf.Model.extend({
    hasTimestamps: false,
    idAttribute: 'id',
    tableName: "users",
  });
  
  module.exports = {
    User
  }