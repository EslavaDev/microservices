const jwt = require('jsonwebtoken');
const { Server } = require('./config');

module.exports = function generateToken(usr){
    
    let secretKey = process.env.JWT || Server.jwtSecret;
    let expiresIn = process.env.JWT_EXPIRES_IN || Server.jwtExpiration;
    console.log(usr)
    console.log(usr.get("id"))
    return jwt.sign({
      _id : usr.get("id"),
      userName: usr.get("email"),
      Name: `${usr.get("name")} ${usr.get("last_name")}`
    },
    secretKey, {algorithm: 'HS256', expiresIn: expiresIn}
  );}
