var express = require('express');
var router = express.Router();

// Require controller modules
var bedigreeCtrl = require('../controllers/pedigree');
var siblingCtrl = require('../controllers/sibling');

/* BEDIGREE ROUTES */

/* GET pedigree home page */
router.get('/', bedigreeCtrl.index);

/* GET request for list of all pedigree items */
router.get('/pedigree', bedigreeCtrl.pedigreeChart);

/* GET request for for a specific pedigree item */
router.get('/pedigree/:id', bedigreeCtrl.pedigreeDetail);

/* SIBLING ROUTES */

module.exports = router;
