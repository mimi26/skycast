var express = require('express');
var router = express.Router();
const models = require('../db/models/index');
const axios = require('axios');
const apiCall = require('../api-helpers/api-calls');
require('dotenv').config();

router.get('/', apiCall.geoLocateCall, function(req, res, next) {
  const geoLocateTemp = res.locals.temperature;
  const geoLocateSum = res.locals.geolocatesum;
  console.log('this is goelocatesum:', geoLocateSum);
  res.render('index', { geoLocateTemp, geoLocateSum });
});

router.post('/', apiCall.geocodeCall, apiCall.darkSkyCall, function(req, res, next) {
  const city = res.locals.city;
  const neighborhood = res.locals.neighborhood;
  const temp = res.locals.temp;
  const summary = res.locals.summary;
  const geoLocateTemp = undefined;
  const geoLocateSum = undefined;
  res.render('index', { city, neighborhood, temp, summary, geoLocateTemp, geoLocateSum
   });
});

module.exports = router;


