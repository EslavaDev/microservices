const Request = require('request');
const Boom = require('boom');

async function  save(req, reply) {
  let payload = req.payload
  return reply.act({
    role: "Categories",
    cmd: "save",
    payload
  })
}

async function fetchAll(req, reply){
  return reply.act({
    role: "Categories",
    cmd: "fetchAll",
    payload: null
  })
}

module.exports = {
  save,
  fetchAll
}