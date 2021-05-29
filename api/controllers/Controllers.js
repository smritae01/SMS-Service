const dotenv = require("dotenv");
dotenv.config();
'use strict';

const redis = require('redis');
const moment = require('moment');
var client;

if (process.env.REDIS_URL) {
  var rtg   = require("url").parse(process.env.REDIS_URL);
   client = redis.createClient(rtg.port, rtg.hostname);
  client.auth(rtg.auth.split(":")[1]);

} else {
   client = redis.createClient(6379);
}

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
    else if(text == "STOP" || text == "STOP\r" || text == "STOP\n" || text == "STOP\r\n"){
        client.setex('from', 14400, temp.from);
        client.setex('to', 14400, temp.to);
        client.setex('text', 14400, temp.text);
        let body = {
        'count': 0,
        'startTime': moment().unix()
        }
        client.set('reqs',JSON.stringify(body));
        // console.log('Heyyy ', body)

      }
     if(text.length>=1 && text.length<=120 && from.length>=6 && from.length<=16 && to.length>=6 && to.length<=16){

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

     //CHECKING THE CACHE IN CASE OF STOP REQUEST

     if(text.length>=1 && text.length<=120 && from.length>=6 && from.length<=16 && to.length>=6 && to.length<=16){

       client.get('from', (err, value) => {
            if (err) {
              throw err;
            }
              // console.log('fromValue:', value);
              client.get('to', (err, value1) => {
                   if (err) {
                     throw err;
                   }
                     // console.log('toValue:', value1);
                     if(value == temp.from && value1 == temp.to){
                       return res.status(403).send({
                         auth : msg,
                         error: `sms from ${temp.from} and to ${temp.to} blocked by STOP request`,
                         message:``,
                       });
                     } else{

                       client.exists('from',(err,reply) => {
                         if(err) {
                           console.log("Redis not working...")
                           system.exit(0)
                         }
                         if(reply === 1) {
                           // user exists
                           // check time interval
                           client.get('reqs',(err,resp) => {
                             let data = JSON.parse(resp)
                             let currentTime = moment().unix()
                             let difference = (currentTime - data.startTime)/(60*60)
                             if(difference >= 1) {
                               let body = {
                                 'count': 1,
                                 'startTime': moment().unix()
                               }
                               client.set('reqs',JSON.stringify(body))

                             }
                             if(difference < 1) {
                               // console.log(data.count)
                               if(data.count > 50) {
                                 return res.status(429).send({error: `limit reached for from ${temp.from}`, message: ``})
                               }else{
                                 data.count++
                                 client.set('reqs',JSON.stringify(data))

                                 return res.status(200).send({
                                   auth: auth_msg,
                                   error: ``,
                                   message: `outbound sms is ok!`,
                                 });
                               }
                             }
                           })
                         } else {
                           // add new user
                           let body = {
                             'count': 1,
                             'startTime': moment().unix()
                           }
                           client.set('reqs',JSON.stringify(body))

                         }
                       })

                     }
                 });
          });

     }

   } catch (error) {
     return res.status(500).send({
       auth: auth_msg,
       error: `unknown error!`,
       message: ``,
     })
   }

};
