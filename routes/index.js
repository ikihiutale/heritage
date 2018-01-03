'use strict';

var express = require('express');
var router = express.Router();

//Require controller modules
var familyCtrl = require('../controllers/family');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect('/family');
});

/* GET reset family */
router.get('/reset', familyCtrl.reset);

/* GET reset family */
router.get('/about', familyCtrl.about);

module.exports = router;
