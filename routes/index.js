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
  models.Address.create({
    address: req.body.address
  }).then((data) => {
    res.locals.address = data.dataValues.address.replace(/ /g, "+");
    console.log('this address in post:', res.locals.address);

  }).then(() => {return next();})
    res.redirect('/');
  })


router.get('/', function(req, res, next) {
  axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${res.locals.address}&key=${process.env.MAP_KEY}`)
  .then((info) => {
    const lat = info.data.results[0].geometry.location.lat;
    const lng = info.data.results[0].geometry.location.lng;
    //res.locals.location = location;
  axios.get(`https://api.darksky.net/forecast/${process.env.WEATHER_KEY}/${lat},${lng}`)
  .then((response) => {

    const temp = response.data.currently.temperature;
    const summary = response.data.currently.summary;


    })
    })

  console.log('this is temp:', temp);
  res.render('index');
});



module.exports = router;


