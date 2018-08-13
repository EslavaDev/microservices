const Request = require('request');
const Boom = require('boom');




async function save(req, reply) {
  console.log('payload', req.payload)
  let payload = req.payload
  return reply.act({
    role: "Urgentes",
    cmd: "save",
    payload
  })
}

async function fetchAll(req, reply){
  return reply.act({
    role: "Urgentes",
    cmd: "fetchAll",
    payload: null
  })
}

module.exports = {
  save,
  fetchAll
}