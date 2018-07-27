const Hapi = require('hapi');
const Joi = require('joi');


const fetchAllOptions={
    cors: true,
    description: "Use this method to get list of staff",
    tags:["api","staff"]

}

const AuthOptions={
    auth: false,
    cors:true,
    notes: "generate a new Token",
    description: "use this metod for signin staff",
    validate:{
        payload:Joi.object({
            email: Joi.string().max(30).required()
            .description("email that the user'll use to acces to the app")
            .example("batman")
            .label("email"),
            password: Joi.string().max(40).required()
            .description("the password for accesing to the platform")
            .label("password")
        }).label("payload")
    },
    plugins:{
        'hapi-swagger':{
            payloadType: 'form'
        }
    },
    tags:["api","staff"]

}

module.exports = {
    AuthOptions,
    fetchAllOptions
}