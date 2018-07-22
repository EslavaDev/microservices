const Knex = require('knex');
const Bookshelf = require('bookshelf');
const {database} = require('./config');

const knex = new Knex(database); //creating knex instance
const bookshelf = new Bookshelf(knex); //creating bookshlef instance

module.exports = bookshelf;