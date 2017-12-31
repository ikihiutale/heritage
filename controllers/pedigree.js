var pedigree = require('../models/pedigree');

// GET: display pedigree home page
exports.index = function(req, res) {
  res.send('NOT IMPLEMENTED: Pedigree home page');
};

// GET: display pedigree chart page
exports.pedigreeChart = function(req, res) {
    res.send('NOT IMPLEMENTED: Pedigree chart');
};

// GET: display detail page for a specific pedigree
exports.pedigreeDetail = function(req, res) {
    res.send('NOT IMPLEMENTED: Pedigree detail: ' + req.params.id);
};
