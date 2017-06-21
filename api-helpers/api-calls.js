const axios = require('axios');
const models = require('../db/models/index');
require('dotenv').config();


//takes address from user input to output lat, long and neighborhood info
function geocodeCall (req, res, next) {
  //stores user input info in variable
  const address = req.body.address;
  axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.MAP_KEY}`)
  .then((info) => {
    //store user location data returned from api call in res.locals
    res.locals.lat = info.data.results[0].geometry.location.lat;
    res.locals.lng = info.data.results[0].geometry.location.lng;
    res.locals.address = info.data.results[0].formatted_address;

    return next();//like a boss
  }).catch((err) => {
    console.log(err);
  });
}

//use data from geocodeCall funtion to plug into darksky api to get weather data for user's inputted location.
function darkSkyCall (req, res, next) {
  axios.get(`https://api.darksky.net/forecast/${process.env.WEATHER_KEY}/${res.locals.lat},${res.locals.lng}`)
  .then((weather) => {
    //store data returned from api call in res.locals
    //round temp to get rid of decimals for UX
      res.locals.temp = Math.round(weather.data.currently.temperature);
      res.locals.summary = weather.data.currently.summary;
      res.locals.forecast = weather.data.daily.data;
      return next();
     }).catch((err) => {
      console.log(err);
  });
}

//function to get weather data without user input to display on landing page
function geoLocateCall (req, res, next) {
  //use geolocate to get user location data from browser without user input
  axios.post(`https://www.googleapis.com/geolocation/v1/geolocate?key=${process.env.MAP_KEY}`)
  .then((response) => {
    //store lat and long data in variables
    const lat = response.data.location.lat;
    const lng = response.data.location.lng;
    //return second axios call to avoid double callback.
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
