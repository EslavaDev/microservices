const bookshelf = require('./database');

const Profiles = bookshelf.Model.extend({
  tableName: "profiles"
});
module.exports = {
  Profiles
}