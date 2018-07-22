const bookshelf = require('./database');

const Urgentes = bookshelf.Model.extend({
  tableName: "urgentes"
});
module.exports = {
  Urgentes
}