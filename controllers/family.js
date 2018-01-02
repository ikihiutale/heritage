var mongoose = require('mongoose');
var Member = require('../models/member');
var familyTreeData = require('../db/family_tree.json')
var async = require('async');


exports.members2 = function(req, res, next) {
  Member.find().sort([['lastName', 'ascending']]).exec(function  (err, members) {
    if (err) { return next(err); }
    res.render('family', { title: 'Member List', members:  members});
  });
};


// GET: list of members
exports.members = function(req, res, next) {
  async.parallel({    
    members: function(callback) {
      Member.find().sort([['lastName', 'ascending']]).exec(callback);
    },
    memberCount: function(callback) {
      Member.count(callback);
    }
  }, 
  function(err, results) {
      if (err) { return next(err); }
      res.render('family', { title: 'Member List', data: results});
  });
};

// GET: display family tree page
exports.tree = function(req, res) {
  res.send('NOT IMPLEMENTED: family tree page: ' + req.params.memberId);
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
