var express = require('express');
var router = express.Router();
const models = require('../db/models/index');
const axios = require('axios');
const apiCall = require('../api-helpers/api-calls');
require('dotenv').config();

router.get('/', function(req, res, next) {
  res.render('index');
});

router.post('/', apiCall.geocodeCall, apiCall.darkSkyCall, function(req, res, next) {
  const city = res.locals.city;
  const neighborhood = res.locals.neighborhood;
  const temp = res.locals.temp;
  const summary = res.locals.summary;
  res.render('index', { city, neighborhood, temp, summary });
});

module.exports = router;


