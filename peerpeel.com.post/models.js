const bookshelf = require('./database');

const Post = bookshelf.Model.extend({
  hasTimestamps: true,
  idAttribute: 'id',
  tableName: "posts",
  user: function() {
    return this.belongsTo(User, 'userId');
  },
  worker: function() {
    return this.belongsTo(User, 'workerId');
  },
  category: () =>{
    return this.belongsTo(Categories, 'category');
  }
});
const User = bookshelf.Model.extend({
  hasTimestamps: true,
  idAttribute: 'id',
  tableName: "users",
  post: function() {
    return this.hasMany(Post);
  }
});

const Categories = bookshelf.Model.extend({
  hasTimestamps: true,
  idAttribute: 'id',
  tableName: "category",
  post: function() {
    return this.hasMany(Post);
  }
});

var PostC = bookshelf.Collection.extend({
  model: Post
});

module.exports = {
  Post,
  PostC,
  User,
  Categories
}