var mongoose = require('mongoose');
var Member = require('../models/member');
var familyTreeData = require('../db/family_tree.json')

// GET: display family home page
exports.index = function(req, res) {  
  res.send('NOT IMPLEMENTED: Family home page');
};

// GET: display family tree page
exports.tree = function(req, res) {
  res.send('NOT IMPLEMENTED: family tree page: ' + req.params.familyId);
};

// GET: reset family data
exports.reset = function(req, res) {
  // Clear all existing documents from the collections
  Member.remove().exec();
  // Populate the Member collection from json data
  for( var idx = 0; idx < familyTreeData.length; idx++ ) {
    new Member(familyTreeData[idx]).save();
  }  
  res.redirect( "/" );
};

//GET: display family member siblings
exports.siblings = function(req, res) {
  res.send('NOT IMPLEMENTED: family member siblings page: ' + req.params.familyId + " -> " + req.params.memberId);
};
