const express = require('express');

const app = express();

const port = process.env.PORT||80;

var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require('./api/routes/Routes'); //importing route
routes(app); //register the route

app.use(function(req, res) {
  res.status(405).send({url: req.originalUrl + ' not found'})
});

app.listen(port, () => {
 console.log(`Server running on port ${port}`);
});
