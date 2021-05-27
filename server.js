const express = require('express');

const app = express();

const port = 3000;

const basicAuth = require('express-basic-auth');

var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require('./api/routes/Routes'); //importing route
routes(app); //register the route

app.use(function(req, res) {
  res.status(405).send({url: req.originalUrl + ' not found'})
});

app.use(basicAuth({
    users: { admin: 'supersecret123' },
    challenge: true // <--- needed to actually show the login dialog!
}));

app.listen(port, () => {
 console.log(`Server running on port ${port}`);
});
