const Request = require('request');
const Boom = require('boom');

async function  save(req, reply) {
  let payload = req.payload
  return reply.act({
    role: "Post",
    cmd: "save",
    payload
  })
}

async function  update(req, reply) {
  let payload = req.payload
  return reply.act({
    role: "Post",
    cmd: "update",
    payload
  })
}

async function fetchAll(req, reply){
  return reply.act({
    role: "Post",
    cmd: "fetchAll",
    payload: null
  })
}

module.exports = {
  save,
  update,
  fetchAll
}