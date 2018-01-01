var express = require('express');
var router = express.Router();

//Require controller modules
var familyCtrl = require('../controllers/family');

/* GET home page. */
router.get('/', function(req, res, next) {
  // The method Response.render() is used to render a specified template along with the values 
  // of named variables passed in an object, and then send the result as a response
  res.render('index', { title: 'Express' });
});

/* GET reset family */
router.get('/reset', familyCtrl.reset);


module.exports = router;
