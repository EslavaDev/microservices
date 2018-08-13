const Joi = require('joi');


const fetchAllOptions={
    cors: true,
    description: "Use this method to get list of staff",
    tags:["api","user"]

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
    tags:["api","user"]

}

const saveOptions={
    auth: false,
    cors:true,
    notes: 
    ` method for created user: creating json  \n
    {
        email: 'aqui va el email',
        password: 'aqui va el password'
    }`,
    description: "use this metod for signin staff",
    validate:{
        payload:Joi.object().keys({
            name: Joi.string().trim().max(30).required()
            .description("name that the user'll use to acces to the app")
            .label("name"),
            lastname: Joi.string().trim().max(30).required()
            .description("lastname that the user'll use to acces to the app")
            .label("lastname"),
            identification: Joi.string().trim().max(30).required()
            .description("identification that the user'll use to acces to the app")
            .label("identification"),
            direction: Joi.string().trim().max(50).required()
            .description("direction that the user'll use to acces to the app")
            .label("direction"),
            phone: Joi.number().integer().max(30).required()
            .description("phone that the user'll use to acces to the app")
            .label("phone"),
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
    tags:["api","user"]

}



const removeOptions={
  auth: 'jwt',
  cors: true,
  description: "Use this method to remove the staff",
  validate:{
    params:{
        id: Joi.number().integer().example("prueba de example").description("this is remove is user for id").required()
    }
},
  tags:["api","user"]

}

module.exports = {
    AuthOptions,
    removeOptions,
    saveOptions,
    fetchAllOptions
}