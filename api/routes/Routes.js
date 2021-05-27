'use strict';
module.exports = function(app) {

  var prod = require('../controllers/Controllers');

  // prod Routes
  app.route('/inbound/sms')
    .put(prod.sms_task)


  app.route('/outbound/sms')
  .put(prod.sms_task)

};
