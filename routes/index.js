var express = require('express');
var router = express.Router();
const models = require('../db/models/index');
const axios = require('axios');
//const apiCall = require('../api-helpers/api-calls');
require('dotenv').config();


router.get('/', function(req, res, next) {
  res.render('index');
});

router.post('/', function(req, res, next) {
  const address = req.body.address.replace(/ /g, "+");
  axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.MAP_KEY}`)
  .then((info) => {
    const lat = info.data.results[0].geometry.location.lat;
    const lng = info.data.results[0].geometry.location.lng;
    return axios.get(`https://api.darksky.net/forecast/${process.env.WEATHER_KEY}/${lat},${lng}`)
  })
  .then((weather) => {
      const temp = Math.round(weather.data.currently.temperature);
      const summary = weather.data.currently.summary;
      const city = weather.data.timezone.replace(/^[^/]*\//g, "").replace(/_/g, " ");
      console.log('this is city:', city);

    res.render('index', { temp, summary });
     });
  });





module.exports = router;


