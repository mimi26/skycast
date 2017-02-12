const axios = require('axios');
const models = require('../db/models/index');

require('dotenv').config();

// router.put('/:id', function(req, res, next) {
//   models.Technology.update({
//     name: req.body.name,
//     description: req.body.description,
//     documentation: req.body.documentation,
//     use_case: req.body.use_case,
//     category_name: req.body.category_name
//   }, { where: { id: req.params.id} }).then(() => {
//     res.redirect(`/technologies/${req.params.id}`);
//   });
// });

function apiCalls (req, res, next) {
  models.Address.findAll( {
    where: { id: req.params.id}
  }).then((data) => {
    const address = data;

  //console.log('this is addres:', address);
    });
  axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=${process.env.MAP_KEY}`)
  .then((info) => {
    const lat = info.data.results[0].geometry.location.lat;
    const lng = info.data.results[0].geometry.location.lng;
    //res.locals.location = location;
  axios.get(`https://api.darksky.net/forecast/${process.env.WEATHER_KEY}/${lat},${lng}`)
  .then((response) => {

    res.locals.response = response;
    return next();
    });
  });
}



module.exports = { apiCalls };
