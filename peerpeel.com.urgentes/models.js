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
  hasTimestamps: false,
  idAttribute: 'id',
  tableName: "users",
  post: function() {
    return this.hasMany(Urgente);
  }
});
module.exports = {
  Urgente,
  User
}