const axios = require('axios');

require('dotenv').config();

function apiCalls (req, res, next) {
  axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=${process.env.MAP_KEY}`)
  .then((info) => {
    const lat = info.data.results[0].geometry.location.lat;
    const lng = info.data.results[0].geometry.location.lng;
    //res.locals.location = location;
  axios.get(`https://api.darksky.net/forecast/${process.env.WEATHER_KEY}/${lat},${lng}`)
  .then((response) => {
    //console.log("this is temp:", response.data.currently.temperature);
    //const temp = Math.round(response.data.currently.temperature);
    //const summary = response.data.currently.summary;
    res.locals.response = response;
    return next();
  })
  })

}

module.exports = { apiCalls };
