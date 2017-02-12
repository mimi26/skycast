const axios = require('axios');
require('dotenv').config();

function mapCall (req, res, next) {
  axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=${process.env.MAP_KEY}`)
  .then((location) => {
    res.locals.location = location;
    return next();
  })
}

module.exports = { mapCall };
