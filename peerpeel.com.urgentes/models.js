const bookshelf = require('./database');

const Urgente = bookshelf.Model.extend({
  hasTimestamps: true,
  idAttribute: 'id',
  tableName: "urgents",
  user: function() {
    return this.belongsTo(User, 'userId');
  },
  worker: function() {
    return this.belongsTo(User, 'workerId');
  }
});
const User = bookshelf.Model.extend({
  hasTimestamps: true,
  idAttribute: 'id',
  tableName: "users",
  urgente: function() {
    return this.hasMany(Urgente);
  }
});
var UrgenteC = bookshelf.Collection.extend({
  model: Urgente
});
module.exports = {
  Urgente,
  UrgenteC,
  User
}