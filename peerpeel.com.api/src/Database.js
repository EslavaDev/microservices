const Knex = require('knex');
const Bookshelf = require('bookshelf');
const { getDatabaseConfig } = require("./Config");
console.log(getDatabaseConfig())
const knex = new Knex(getDatabaseConfig()); //creating knex instance
const bookshelf = new Bookshelf(knex); //creating bookshlef instance

module.exports = bookshelf;