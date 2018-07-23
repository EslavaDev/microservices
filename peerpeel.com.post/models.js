const bookshelf = require('./database');

const Post = bookshelf.Model.extend({
  hasTimestamps: false,
  idAttribute: 'id',
  tableName: "posts",
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
    return this.hasMany(Post);
  }
});

module.exports = {
  Post,
  User
}