var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // The method Response.render() is used to render a specified template along with the values 
  // of named variables passed in an object, and then send the result as a response
  //res.redirect('/heritage');
  res.render('index', { title: 'Express' });
});

// About page route
router.get('/about', function (req, res) {
  res.send('About this wiki');
});


module.exports = router;
