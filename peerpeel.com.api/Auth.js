const { User } = require("./models");
const _ =require("lodash");
module.exports = async function validate(decoded, request) {
  console.log(decoded)
  const {_id} = decoded;
  let usr = await new User({id: _id}).fetch();
  return {isValid: !_.isNull(usr) && !_.isUndefined(usr)};
}