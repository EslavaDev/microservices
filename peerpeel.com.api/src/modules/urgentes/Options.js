const Joi = require('joi');


const findByIdOption={
  
    auth: "jwt",
    cors: true,
    description: "Use this method to find a services type urgent by id",
    validate:{
        params:{
            id: Joi.number().integer().example("prueba de example").description("this is the id of the service type urgent").required()
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

const saveOptions={
    auth: 'jwt',
    cors:true,
    notes: 
    ` method for generate a new Token and SingIn for user: creating json  \n
    {
        "body":{
            "description": "dasdasd",
            "directionExist": false,
            "locationExist": false,
            "status": 1,
            "price":  10000
        },
        "ids":{
          "userId": 4
        }
    }`,
    description: "use this metod for signin staff",
    validate:{
        payload:Joi.object().keys({
            body: Joi.object().keys({
                description: Joi.string().required().example('pasear chandoso').label('description'),
                directionExist: Joi.boolean().required().label('directionExist'),
                locationExist: Joi.boolean().required().label('locationExist'),
                status: Joi.number().integer().required().default(1).label('status'),
                price: Joi.number().integer().required().label('price')
            }).label('body'),
            ids: Joi.object().keys({
                userId: Joi.number().integer().required().label('userId')
            }).label('ids')
            
        }).label("payload")
    
    },
    tags:["api","urgents"]

}

module.exports = {
    fetchAllOptions,
    findByIdOption,
    saveOptions
}