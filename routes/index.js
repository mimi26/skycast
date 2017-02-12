var express = require('express');
var router = express.Router();
const axios = require('axios');
const apiCall = require('../api-helpers/api-calls');
require('dotenv').config();


router.get('/', apiCall.apiCalls, function(req, res, next) {
  const temp = Math.round(res.locals.response.data.currently.temperature);
  const summary = res.locals.response.data.currently.summary;

    res.render('index', { temp, summary });
    });





// router.get('/', function(req, res, next) {
//   axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=AIzaSyCE3YJO7kHrKEAU2GyaghLn7qU5eHJ_Res`)
//   .then((response) => {
//     console.log("this is latitude:", response.data.results[0].geometry.location.lat);
//     console.log("this is longitude:", response.data.results[0].geometry.location.lng);


//     res.render('index', { lat, lng });
//   });
// });


// router.post('/', function(req, res, next) {
//   axios.post('https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyCE3YJO7kHrKEAU2GyaghLn7qU5eHJ_Res')
//   .then((response) => {
//     console.log("this is response:", response.data);

//     res.render('index', {


//     });
//   }).catch(function (error) {
//     console.log(error);
//   });
// });



module.exports = router;


