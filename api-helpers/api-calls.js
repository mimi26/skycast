const axios = require('axios');
const models = require('../db/models/index');
require('dotenv').config();



function geocodeCall (req, res, next) {

  const address = req.body.address;
  axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.MAP_KEY}`)
  .then((info) => {
    res.locals.lat = info.data.results[0].geometry.location.lat;
    res.locals.lng = info.data.results[0].geometry.location.lng;
    res.locals.city = info.data.results[0].address_components[3].long_name;
    res.locals.neighborhood = info.data.results[0].address_components[2].long_name;

    return next();//like a boss
  }).catch((err) => {
    console.log(err);
  });
}

function darkSkyCall (req, res, next) {
  axios.get(`https://api.darksky.net/forecast/${process.env.WEATHER_KEY}/${res.locals.lat},${res.locals.lng}`)
  .then((weather) => {
      res.locals.temp = Math.round(weather.data.currently.temperature);
      res.locals.summary = weather.data.currently.summary;
      res.locals.forecast = weather.data.daily.data;
      return next();
     }).catch((err) => {
      console.log(err);
  });
}

function geoLocateCall (req, res, next) {
  axios.post(`https://www.googleapis.com/geolocation/v1/geolocate?key=${process.env.MAP_KEY}`)
  .then((response) => {
    const lat = response.data.location.lat;
    const lng = response.data.location.lng;
    return axios.get(`https://api.darksky.net/forecast/${process.env.WEATHER_KEY}/${lat},${lng}`)
    }).then((response) => {
      res.locals.temperature = Math.round(response.data.currently.temperature);
      res.locals.geolocatesum = response.data.currently.summary;
      res.locals.geoForecast = response.data.daily.data;
      return next();
    });
}


module.exports = {
  geocodeCall,
  darkSkyCall,
  geoLocateCall
 };
