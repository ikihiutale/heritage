var express = require('express');
var router = express.Router();

//Require controller modules
var familyCtrl = require('../controllers/family');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: ''});
});

/* GET reset family */
router.get('/reset', familyCtrl.reset);


module.exports = router;
