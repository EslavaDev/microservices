const jwt = require('jsonwebtoken');
const { getServerConfig } = require("./Config");

module.exports = function generateToken(usr){
    
    let secretKey = process.env.JWT || getServerConfig().jwtSecret;
    let expiresIn = process.env.JWT_EXPIRES_IN || getServerConfig().jwtExpiration;
    console.log(usr)
    console.log(usr.get("id"))
    let token = jwt.sign({
      _id : usr.get("id"),
      userName: usr.get("email"),
      Name: `${usr.get("name")} ${usr.get("last_name")}`
    },
    secretKey, {algorithm: 'HS256', expiresIn: expiresIn}
  );

  return {
    status: 200,
    message: "Logueado con exito",
    token
  }
  
}
