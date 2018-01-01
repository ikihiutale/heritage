var express = require('express');
var router = express.Router();

// Require controller modules
var familyCtrl = require('../controllers/family');

/* FAMILY ROUTES */

/* GET family home page */
router.get('/', familyCtrl.index);

/* GET family tree */
router.get('/:id', familyCtrl.tree);

/* GET reset family */
router.get('/reset', familyCtrl.reset);

module.exports = router;
