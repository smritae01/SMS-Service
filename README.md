# SMS-service

#### Description:

A Simple SMS API service that exposes the following 2 APIs that accepts JSON data as input and handles all errors through appropriate HTTP error codes.

- API Request 1:
  * HTTP Method: PUT
  * Request URI: /inbound/sms
  * Body Parameter:\
    `{
      "from": "1234567",  
      "to": "123452539",  
      "text": "Hello there!"  
     }`  
  * Response 1 : JSON object like below\
    `{  
      "auth" : "Authorization granted/failed",  
      "error" : "Error msg if any",  
      "message" : "Success msg"  
     }`  

- API Request 2:
   * HTTP Method: PUT
   * Request URI: /outbound/sms
   * Body Parameter:\
    `{  
      "from": "1234567",  
      "to": "123452539",  
      "text": "Hello there!"  
     }`  
   * Response 2 : JSON object like below\
      `{  
        "auth" : "Authorization granted/failed",  
        "error" : "Error msg if any",  
        "message" : "Success msg"  
       }`  

#### Authentication credentials provided in the Submission document - Assignment-4.docx

#### Installations necessary to run the microservices:

- Clone this git repository

`git clone https://github.com/smritae01/SMS-service.git`

- Run this to install all dependencies

`npm install`


- Start redis server in another terminal tab

`redis-server`

- Optional : Check whether redis server is running perfectly by executing `redis-cli ping` on a new tab.\
  You should receive PONG as the response.\

- Start NodeJS server at http://localhost:3000 in the terminal

`npm run start`

#### You can test the routes using Postman.

- Use as : localhost:3000/inbound/sms or localhost:3000/outbound/sms

#### Technologies used:

- nodejs
- express
- redis (for storage and caching)
