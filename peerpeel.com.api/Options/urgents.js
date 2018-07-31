const Hapi = require('hapi');
const Joi = require('joi');


const findByIdOption={
  
    auth: "jwt",
    cors: true,
    description: "Use this method to find a movie by id",
    validate:{
        params:{
            id: Joi.number().integer().example("prueba de example").description("this is the id of the movie").required()
        }
    },
    tags:["api","urgents"]

}

const fetchAllOptions={
  
    auth: 'jwt',
    cors:true,
    description: "Use this method to get list of films",
    tags:["api","urgents"]

}

module.exports = {
    fetchAllOptions,
    findByIdOption
}