const {
  User
} = require('./models');
const Boom = require('boom');

async function fetchAll(
  request,
  reply
) {
  try {
    let records = await User.fetchAll();
    return records.toJSON();
  } catch (err) {
    return Boom.badRequest();
  }
}

async function remove(
  request,
  reply
) {
  try {
    let id = request.params.id;
    if (id) {
      let model = await new User({
        id
      }).destroy();
      if (!model)
        return Boom.notFound();
      return reply.response("ok").code(200);
    }
  } catch (err) {
    return Boom.badRequest(err.sqlMessage);
  }
}
async function save(
  request,
  reply
) {
  try {
    let model = await new User(request.payload).save();
    if (!model)
      return Boom.notFound();
    return model.toJSON();

  } catch (err) {
    return Boom.badRequest(err.sqlMessage);
  }
}

async function update(
  request,
  reply
) {
  try {
    let id = request.params.id;
    if (id) {
      let model = await new User({
        id
      }).save(request.payload, {
        patch: true
      }); // pide la propiedad id 
      if (!model)
        return Boom.notFound();
      return model.toJSON();
    }
  } catch (err) {
    return Boom.badRequest(err.sqlMessage);
  }
}

module.exports = {
  save: save,
  update: update,
  fetchAll: fetchAll,
  remove:remove
}