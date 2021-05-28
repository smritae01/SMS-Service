const dotenv = require("dotenv");
dotenv.config();
'use strict';

const axios = require('axios');

const redis = require('redis');

const client = redis.createClient(6379);

client.on("error", (error) => {
 console.error(error);
});

exports.sms_task = function(req, res) {

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
      msg = 'Authorization granted!';
    }else{
        return res.status(401).json({ message: 'Invalid Authentication Credentials' });
    }


   try {
     var temp = req.body;
     var foodItem = temp.fooditem;

     // Check the redis store for the data first
     client.get(foodItem, async (err, recipe) => {
       if (recipe) {
         return res.status(200).send({
           auth : msg,
           error: false,
           message: `Recipe for ${foodItem} from the cache`,
           data: JSON.parse(recipe)
         })
       } else { // When the data is not found in the cache then we can make request to the server

           const recipe = await axios.get(`http://www.recipepuppy.com/api/?q=${foodItem}`);

           // save the record in the cache for subsequent request
           client.setex(foodItem, 1440, JSON.stringify(recipe.data.results));

           // return the result to the client
           return res.status(200).send({
             auth : msg,
             error: false,
             message: `Recipe for ${foodItem} from the server`,
             data: recipe.data.results
           });
       }
     })
   } catch (error) {
       console.log(error)
   }

};
