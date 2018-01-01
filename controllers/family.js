var mongoose = require('mongoose');
var Member = require('../models/member');
var familyTreeData = require('../db/family_tree.json')

// GET: display family home page
exports.index = function(req, res) {  
  res.send('NOT IMPLEMENTED: Family home page');
};

// GET: display family tree page
exports.tree = function(req, res) {
  res.send('NOT IMPLEMENTED: family tree page: ' + + req.params.id);
};

// GET: reset family data
exports.reset = function(req, res) {
  // Clear all existing documents from the collections
  Member.find().remove();
  // Populate the Member collection from json data
  for( var idx = 0; idx < familyTreeData.length; idx++ ) {
    new Member(familyTreeData[idx]).save();
  }
  
  res.redirect( "/" );
};
