const axios = require('axios');
require('dotenv').config();

function darkskyCall (req, res, next) {
  axios.get(`https://api.darksky.net/forecast/${process.env.WEATHER_KEY}/40.730610,-73.935242`)
  .then((response) => {
    //console.log("this is temp:", response.data.currently.temperature);
    //const temp = Math.round(response.data.currently.temperature);
    //const summary = response.data.currently.summary;
    res.locals.response = response;
    return next();
  })
}

module.exports = { darkskyCall };
