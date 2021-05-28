const dotenv = require("dotenv");
dotenv.config();
'use strict';

const axios = require('axios');

// const redis = require('redis');
//
// const client = redis.createClient(6379);
//
// client.on("error", (error) => {
//  console.error(error);
// });

exports.sms_intask = function(req, res) {

//AUTHORIZATION STUFF
  if (!req.headers.authorization || req.headers.authorization.indexOf('Basic ') === -1) {
        return res.status(401).json({ message: 'Missing Authorization Header' });
    }

    const base64Credentials =  req.headers.authorization.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
    const [username, password] = credentials.split(':');
    var msg;
    const userr = process.env.TEST_USERNAME;
    const pass = process.env.TEST_PASSWORD;

    if (username === userr && password === pass) {
      auth_msg = 'Authorization granted!';
    }else{
        return res.status(401).json({ message: 'Invalid Authentication Credentials' });
    }
//AUTHORIZATION DONE

   try {

     var temp = req.body;
     var from = temp.from;
     var to = temp.to;
     var text = temp.text;

     if(from.length==0){
       if(to.length==0){
         if(text.length==0){
           return res.status(400).send({
             error: `All parameters are missing!`,
             message: ``,
           })
         }
         return res.status(400).send({
           error: `from and to parameters are missing!`,
           message: ``,
         })
       }else if(text.length==0){
         return res.status(400).send({
           error: `from and text parameters are missing!`,
           message: ``,
         })
       }
       return res.status(400).send({
         error: `from parameter is missing!`,
         message: ``,
       })
     }
     else if(from.length<6 || from.length>16){
       return res.status(422).send({
         error: `from parameter is invalid!`,
         message: ``,
       })
     }
     else if(to.length==0){
       if(text.length==0){
         return res.status(400).send({
           error: `to and text parameters are missing!`,
           message: ``,
         })
       }
       return res.status(400).send({
         error: `to parameter is missing!`,
         message: ``,
       })
     }
     else if(to.length<6 || to.length>16){
       return res.status(422).send({
         error: `to parameter is invalid!`,
         message: ``,
       })
     }
     else if(text.length==0){
       return res.status(400).send({
         error: `text parameter is missing!`,
         message: ``,
       })
     }
     else if(text.length<1 || text.length>120){
       return res.status(422).send({
         error: `text parameter is invalid!`,
         message: ``,
       })
     }
     else if(text.length>=1 && text.length<=120 && from.length>=6 && from.length<=16 && to.length>=6 && to.length<=16){
       return res.status(200).send({
         error: ``,
         message: `inbound sms is ok!`,
       })
     }else{
       return res.status(500).send({
         error: `unknown error!`,
         message: ``,
       })
     }

     // Check the redis store for the data first
     // client.get(foodItem, async (err, recipe) => {
     //   if (recipe) {
     //     return res.status(200).send({
     //       auth : msg,
     //       error: false,
     //       message: `Recipe for ${foodItem} from the cache`,
     //       data: JSON.parse(recipe)
     //     })
     //   } else { // When the data is not found in the cache then we can make request to the server
     //
     //       const recipe = await axios.get(`http://www.recipepuppy.com/api/?q=${foodItem}`);
     //
     //       // save the record in the cache for subsequent request
     //       client.setex(foodItem, 1440, JSON.stringify(recipe.data.results));
     //
     //       // return the result to the client
     //       return res.status(200).send({
     //         auth : msg,
     //         error: false,
     //         message: `Recipe for ${foodItem} from the server`,
     //         data: recipe.data.results
     //       });
     //   }
     // })
   } catch (error) {
       console.log(error)
   }

};

exports.sms_outtask = function(req, res) {

//AUTHORIZATION STUFF
  if (!req.headers.authorization || req.headers.authorization.indexOf('Basic ') === -1) {
        return res.status(401).json({ message: 'Missing Authorization Header' });
    }

    const base64Credentials =  req.headers.authorization.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
    const [username, password] = credentials.split(':');
    var msg;
    const userr = process.env.TEST_USERNAME;
    const pass = process.env.TEST_PASSWORD;

    if (username === userr && password === pass) {
      auth_msg = 'Authorization granted!';
    }else{
        return res.status(401).json({ message: 'Invalid Authentication Credentials' });
    }
//AUTHORIZATION DONE

   try {

     var temp = req.body;
     var from = temp.from;
     var to = temp.to;
     var text = temp.text;

     if(from.length==0){
       if(to.length==0){
         if(text.length==0){
           return res.status(400).send({
             error: `All parameters are missing!`,
             message: ``,
           })
         }
         return res.status(400).send({
           error: `from and to parameters are missing!`,
           message: ``,
         })
       }else if(text.length==0){
         return res.status(400).send({
           error: `from and text parameters are missing!`,
           message: ``,
         })
       }
       return res.status(400).send({
         error: `from parameter is missing!`,
         message: ``,
       })
     }
     else if(from.length<6 || from.length>16){
       return res.status(422).send({
         error: `from parameter is invalid!`,
         message: ``,
       })
     }
     else if(to.length==0){
       if(text.length==0){
         return res.status(400).send({
           error: `to and text parameters are missing!`,
           message: ``,
         })
       }
       return res.status(400).send({
         error: `to parameter is missing!`,
         message: ``,
       })
     }
     else if(to.length<6 || to.length>16){
       return res.status(422).send({
         error: `to parameter is invalid!`,
         message: ``,
       })
     }
     else if(text.length==0){
       return res.status(400).send({
         error: `text parameter is missing!`,
         message: ``,
       })
     }
     else if(text.length<1 || text.length>120){
       return res.status(422).send({
         error: `text parameter is invalid!`,
         message: ``,
       })
     }
     else if(text.length>=1 && text.length<=120 && from.length>=6 && from.length<=16 && to.length>=6 && to.length<=16){
       return res.status(200).send({
         error: ``,
         message: `outbound sms is ok!`,
       })
     }else{
       return res.status(500).send({
         error: `unknown error!`,
         message: ``,
       })
     }

     // Check the redis store for the data first
     // client.get(foodItem, async (err, recipe) => {
     //   if (recipe) {
     //     return res.status(200).send({
     //       auth : msg,
     //       error: false,
     //       message: `Recipe for ${foodItem} from the cache`,
     //       data: JSON.parse(recipe)
     //     })
     //   } else { // When the data is not found in the cache then we can make request to the server
     //
     //       const recipe = await axios.get(`http://www.recipepuppy.com/api/?q=${foodItem}`);
     //
     //       // save the record in the cache for subsequent request
     //       client.setex(foodItem, 1440, JSON.stringify(recipe.data.results));
     //
     //       // return the result to the client
     //       return res.status(200).send({
     //         auth : msg,
     //         error: false,
     //         message: `Recipe for ${foodItem} from the server`,
     //         data: recipe.data.results
     //       });
     //   }
     // })
   } catch (error) {
       console.log(error)
   }

};
