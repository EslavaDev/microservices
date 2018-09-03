const bookshelf = require('./database');

const Categories = bookshelf.Model.extend({
  hasTimestamps: true,
  idAttribute: 'id',
  tableName: "category",
});


module.exports = {
  Categories
}