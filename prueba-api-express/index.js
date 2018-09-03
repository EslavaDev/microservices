var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var path = require('path');
//const fileUpload = require('express-fileupload');
const port = 3500;

//Inicializando el objeto express
var app = express();
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({ extended: true}));
mongoose.connect('mongodb://localhost:27017/test',(err,res)=>{
    if(err){
            throw err;
        }
        else{
            app.listen(port, () => {
                console.log("Car iniciado " + port);
            });
            
        }
    })


//var routes = require('./routes');

//CORS ORIGIN MIDELWARE
app.use((req,res,next)=>{
	res.header('Access-Control-Allow-Origin','*');
	res.header('Access-Control-Allow-Headers','X-API-KEY, Origin, X-Requested-Width, Content-Type, Accept,Access-Control-Request-Method,Authorization,territoken');
	res.header('Access-Control-Request-Methods','GET, POST,OPTIONS,PUT,DELETE');
	res.header('Allow','GET, POST,OPTIONS,PUT,DELETE');
	next();
})


//app.use(fileUpload());
app.get('/fetch',(req,res)=>{
  res.status(200).send('hola desde otra api')
})
module.exports = app;
