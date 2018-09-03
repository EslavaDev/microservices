'use strict'
var request = require('request');

exports.petition = function(type,url,port,paths,data,headers){
  return new Promise(function(resolve, reject){
    var options = { 
        method: type,
        url: 'http://'+url+':'+port+paths,
        form:data,
        headers:{
           'Content-Type' : 'application/json',
           //,
          'Authorization':headers.Authorization
          },
       // rejectUnauthorized:false 
      };
        request(options, function (error, response, body) {
          if (error) {
            console.log('error conecction');
            return reject('error conecction');
          }
          else{
            //console.log(response);
            console.log("-------------------------------");
            console.log(body);
            return resolve(body);      
          }
        });
  });
};
