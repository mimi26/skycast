var express = require('express');
var router = express.Router();
const models = require('../db/models/index');
const axios = require('axios');
const moment = require('moment');
const apiCall = require('../api-helpers/api-calls');
require('dotenv').config();

router.get('/', apiCall.geoLocateCall, function(req, res, next) {
  const geoLocateTemp = res.locals.temperature;
  const geoLocateSum = res.locals.geolocatesum;
  const geoForecast = res.locals.geoForecast;
  //console.log('this is geoForecast:', forecast);
  res.render('index', {
    geoLocateTemp: geoLocateTemp,
    geoLocateSum: geoLocateSum,
    geoForecast: geoForecast,
    moment: moment,
    user: req.user });
});

router.post('/', apiCall.geocodeCall, apiCall.darkSkyCall, function(req, res, next) {
  const city = res.locals.city;
  const neighborhood = res.locals.neighborhood;
  const temp = res.locals.temp;
  const summary = res.locals.summary;
  const forecast = res.locals.forecast;
  console.log('this is forecast:', forecast);
  const geoLocateTemp = undefined;
  const geoLocateSum = undefined;
  const geoForecast = undefined;
  res.render('index', {
    city: city,
    neighborhood: neighborhood,
    temp: temp,
    summary: summary,
    forecast: forecast,
    geoLocateTemp: geoLocateTemp,
    geoLocateSum: geoLocateSum,
    geoForecast: geoForecast,
    moment: moment,
    user: req.user
   });
});

module.exports = router;


