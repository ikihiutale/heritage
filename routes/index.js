var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  //res.redirect('/heritage');
  res.render('index', { title: 'Express' });
});

// About page route
router.get('/about', function (req, res) {
  res.send('About this wiki');
});


module.exports = router;
