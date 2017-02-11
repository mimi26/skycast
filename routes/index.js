var express = require('express');
var router = express.Router();
const axios = require('axios');
require('dotenv').config();

router.get('/', function(req, res, next) {
  axios.get(`https://api.darksky.net/forecast/${process.env.SECRET_KEY}/40.730610,-73.935242`)
  .then((response) => {
    console.log("this is temp:", response.data.currently.temperature);
    const temp = Math.round(response.data.currently.temperature);
    res.render('index', { temp });
  });
});

module.exports = router;


