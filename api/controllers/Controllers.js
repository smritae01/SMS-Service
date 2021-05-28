const dotenv = require("dotenv");
dotenv.config();
'use strict';

const axios = require('axios');

const redis = require('redis');

const client = redis.createClient(6379);

client.on("error", (error) => {
 console.error(error);
});

//FUNCTION FOR INBOUND SMS
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
             auth: auth_msg,
             error: `All parameters are missing!`,
             message: ``,
           })
         }
         return res.status(400).send({
           auth: auth_msg,
           error: `from and to parameters are missing!`,
           message: ``,
         })
       }else if(text.length==0){
         return res.status(400).send({
           auth: auth_msg,
           error: `from and text parameters are missing!`,
           message: ``,
         })
       }
       return res.status(400).send({
         auth: auth_msg,
         error: `from parameter is missing!`,
         message: ``,
       })
     }
     else if(from.length<6 || from.length>16){
       return res.status(422).send({
         auth: auth_msg,
         error: `from parameter is invalid!`,
         message: ``,
       })
     }
     else if(to.length==0){
       if(text.length==0){
         return res.status(400).send({
           auth: auth_msg,
           error: `to and text parameters are missing!`,
           message: ``,
         })
       }
       return res.status(400).send({
         auth: auth_msg,
         error: `to parameter is missing!`,
         message: ``,
       })
     }
     else if(to.length<6 || to.length>16){
       return res.status(422).send({
         auth: auth_msg,
         error: `to parameter is invalid!`,
         message: ``,
       })
     }
     else if(text.length==0){
       return res.status(400).send({
         auth: auth_msg,
         error: `text parameter is missing!`,
         message: ``,
       })
     }
     else if(text.length<1 || text.length>120){
       return res.status(422).send({
         auth: auth_msg,
         error: `text parameter is invalid!`,
         message: ``,
       })
     }
     else if(text.length>=1 && text.length<=120 && from.length>=6 && from.length<=16 && to.length>=6 && to.length<=16){
       return res.status(200).send({
         auth: auth_msg,
         error: ``,
         message: `inbound sms is ok!`,
       })
     }else{
       return res.status(500).send({
         auth: auth_msg,
         error: `unknown error!`,
         message: ``,
       })
     }

     if(text == "STOP" || text == "STOP\r" || text == "STOP\n" || text == "STOP\r\n"){
       client.setex(from_ent, 14400, from);
       client.setex(to_ent, 14400, to);
     }

   } catch (error) {
       console.log(error)
   }

};

//FUNCTION FOR OUTBOUND SMS
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
             auth: auth_msg,
             error: `All parameters are missing!`,
             message: ``,
           })
         }
         return res.status(400).send({
           auth: auth_msg,
           error: `from and to parameters are missing!`,
           message: ``,
         })
       }else if(text.length==0){
         return res.status(400).send({
           auth: auth_msg,
           error: `from and text parameters are missing!`,
           message: ``,
         })
       }
       return res.status(400).send({
         auth: auth_msg,
         error: `from parameter is missing!`,
         message: ``,
       })
     }
     else if(from.length<6 || from.length>16){
       return res.status(422).send({
         auth: auth_msg,
         error: `from parameter is invalid!`,
         message: ``,
       })
     }
     else if(to.length==0){
       if(text.length==0){
         return res.status(400).send({
           auth: auth_msg,
           error: `to and text parameters are missing!`,
           message: ``,
         })
       }
       return res.status(400).send({
         auth: auth_msg,
         error: `to parameter is missing!`,
         message: ``,
       })
     }
     else if(to.length<6 || to.length>16){
       return res.status(422).send({
         auth: auth_msg,
         error: `to parameter is invalid!`,
         message: ``,
       })
     }
     else if(text.length==0){
       return res.status(400).send({
         auth: auth_msg,
         error: `text parameter is missing!`,
         message: ``,
       })
     }
     else if(text.length<1 || text.length>120){
       return res.status(422).send({
         auth: auth_msg,
         error: `text parameter is invalid!`,
         message: ``,
       })
     }
     var flag;
     //Check the redis store for the data first
     client.get(from_ent, async (err, from) => {
       if (from) {
         flag=1;
       }
     })
     client.get(to_ent, async (err, to) => {
       if (to && flag==1) {
         return res.status(403).send({
             auth : msg,
             error: `sms from ${from} and to ${to} blocked by STOP request`,
             message:``,
           })
       }
     })

     // var cache_from = client.get(from_ent)
     // var cache_to = client.get(to_ent)
     //
     // if(from == cache_from && to == cache_to){
     //   return res.status(403).send({
     //     auth : msg,
     //     error: `sms from ${cache_from} and to ${cache_to} blocked by STOP request`,
     //     message:``,
     //   })
     // }

     if(text.length>=1 && text.length<=120 && from.length>=6 && from.length<=16 && to.length>=6 && to.length<=16){
       return res.status(200).send({
         auth: auth_msg,
         error: ``,
         message: `outbound sms is ok!`,
       })
     }

   } catch (error) {
     return res.status(500).send({
       auth: auth_msg,
       error: `unknown error!`,
       message: ``,
     })
   }

};
