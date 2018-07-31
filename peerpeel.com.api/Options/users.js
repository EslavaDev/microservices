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
    notes: 
    ` method for generate a new Token and SingIn for user: creating json  \n
    {
        email: 'aqui va el email',
        password: 'aqui va el password'
    }`,
    description: "use this metod for signin staff",
    validate:{
        payload:Joi.object().keys({
            email: Joi.string().trim().max(30).required()
            .description("email that the user'll use to acces to the app")
            .label("email"),
 /*           test:Joi.any()
            .meta({ swaggerType: 'file' })
            .description('json file'),*/
            password: Joi.string().trim().max(40).required()
            .description("the password for accesing to the platform")
            .label("password")
        }).label("payload")
    },
    plugins:{
        'hapi-swagger':{
            payloadType: 'form',
            parameters:{
                example:{
                "hola": "hola"}
        }
    }
    },
    tags:["api","staff"]

}

module.exports = {
    AuthOptions,
    fetchAllOptions
}