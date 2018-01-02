'use strict';

var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var Member = require('../models/member');
var familyTreeData = require('../db/family_tree.json')
var async = require('async');

function fetchParents(memberId, callback) {
  Member.findById(memberId).exec(function(err, memberObj) {
    if (err) {
      return callback(err);
    }   
    callback(err, memberObj);
  });
};
  
function fetchMemberData(memberId, callback) {
  async.parallel({    
    members: function(callback) {
      Member.find().sort([['lastName', 'ascending']]).exec(callback);
    },
    memberCount: function(callback) {
      Member.count(callback);
    },
    tree: function(callback) {
      fetchParents(memberId, callback);
    }
  }, function(err, results) {
    callback(err, results);
  });
};

//GET: list of members
exports.members = function(req, res, next) {
  fetchMemberData(null, function(err, results) {
      if (err) { return next(err); }
      res.render('family', { title: 'Member List', data: results});
  });
};

// GET: display family tree page
exports.tree = function(req, res, next) {
  fetchMemberData(req.params.memberId, function(err, results) {
    if (err) { return next(err); }
    res.render('family', { title: 'Member List', data: results});
  });
};

//GET: about page
exports.about = function(req, res) {
  res.send('NOT IMPLEMENTED: about page');
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
