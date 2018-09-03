const Joi = require('joi');

const fetchAllOptions={
  
    auth: 'jwt',
    cors:true,
    description: "Use this method to get list of categories",
    tags:["api","categories"]

}

const saveOptions={
    auth: 'jwt',
    cors:true,
    notes: 
    ` method for created a new Category  \n
    {
        title: "Domiciliario",
        description: "Actividad de hacer domiciolios",
        status: 0,
        icon: "icono que se usara para esta categoria",
    }`,
    description: "use this metod for created a new Category",
    validate:{
        payload:Joi.object().keys({
           title: Joi.string().max(32).required().label('title'),
           description: Joi.string().max(50).required().example('test').label('description'),
           status: Joi.number().integer().default(0).optional().label('status'),
           icon: Joi.string().min(4).label('icon')
        }).label("payload")
    
    },
    tags:["api","categories"]

}


module.exports = {
    fetchAllOptions,
    saveOptions
}