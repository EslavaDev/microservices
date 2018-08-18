const Joi = require('joi');


const findByIdOption={
  
    auth: "jwt",
    cors: true,
    description: "Use this method to find a services type urgent by id",
    validate:{
        params:{
            id: Joi.number().integer().example("prueba de example").description("this is the id of the service type post").required()
        }
    },
    tags:["api","post"]

}

const fetchAllOptions={
  
    auth: 'jwt',
    cors:true,
    description: "Use this method to get list of post",
    tags:["api","post"]

}

const saveOptions={
    auth: 'jwt',
    cors:true,
    notes: 
    ` method for created a new Post  \n
    {
        "body":{
            "title": "Perrito Pro",
            "description": "dasdasd",
            "direction": "carrera noseque"
            "directionExist": false,
            "locationExist": false
            "price":  10000
        },
        "ids":{
          "userId": 4
        }
    }`,
    description: "use this metod for created a new Post",
    validate:{
        payload:Joi.object().keys({
            body: Joi.object().keys({
                title: Joi.string().required().example('Pasear perro').max(18).label('title'),
                description: Joi.string().required().example('pasear chandoso').label('description'),
                directionExist: Joi.boolean().required().label('directionExist'),
                direction: Joi.string().required().label('direction'),
                locationExist: Joi.boolean().required().label('locationExist'),
                status: Joi.number().integer().required().default(1).label('status'),
                price: Joi.number().integer().required().label('price')
            }).label('body'),
            ids: Joi.object().keys({
                userId: Joi.number().integer().required().label('userId')
            }).label('ids')
            
        }).label("payload")
    
    },
    tags:["api","post"]

}

const updateOptions={
  auth: 'jwt',
  cors:true,
  notes: 
  ` method for generate a new Token and SingIn for user: creating json  \n
  {
      "body":{
          "id": 1,
          "description": "dasdasd",
          "directionExist": false,
          "locationExist": false,
          "status": 1,
          "price":  10000
      },
      "ids":{
        "workerId": 2
      }
  }`,
  description: "use this metod for signin staff",
  validate:{
      payload:Joi.object().keys({
          body: Joi.object().keys({
              id: Joi.number().integer().required().label('id'),
              description: Joi.string().required().example('pasear chandoso').label('description'),
              directionExist: Joi.boolean().required().label('directionExist'),
              locationExist: Joi.boolean().required().label('locationExist'),
              status: Joi.number().integer().required().default(1).label('status'),
              price: Joi.number().integer().required().label('price')
          }).label('body'),
          ids: Joi.object().keys({
              workerId: Joi.number().integer().required().label('workerId')
          }).label('ids')
          
      }).label("payload")
  
  },
  tags:["api","post"]

}

module.exports = {
    fetchAllOptions,
    findByIdOption,
    saveOptions,
    updateOptions
}