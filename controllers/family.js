'use strict';

var mongoose = require('mongoose');
var Member = require('../models/member');
var familyTreeData = require('../db/family_tree.json')
var async = require('async');

//GET: display family tree page
exports.tree = function(req, res, next) {
  var memberId = req.params.memberId;
  var treeData = {};
  Member.find().sort([['lastName', 'ascending']]).exec()  
  .then(function(members) {
    treeData.members = members;
    treeData.memberCount = members.length;
    console.log("Members count " + treeData.memberCount);    
    return Member.findById(memberId).exec();
  })
  .then(function(member) {
    console.log("Member: " + memberId + ", " + (member ? member.id : 'null'));
    treeData.member = member;
    console.log("MEMBER.. " + treeData.member);
    return Member.find().or([
      { $and: [{father: member.father}, {father: {$ne: null}}, {id: {$ne: member.id}}]},
      { $and: [{mother: member.mother}, {mother: {$ne: null}}, {id: {$ne: member.id}}]}
    ]).exec();
  })
  .then(function(siblings) {
    console.log("SIBLINGS.. " + siblings);
    treeData.siblings = siblings;
    res.render('family', { title: 'Family tree', data: treeData});
  })
  .catch(function(err) {
    console.log('Family -> data: ' + err);
    next(err);
  });
};

//GET: list of members
exports.members = function(req, res, next) {
  var treeData = {};
  Member.find().sort([['lastName', 'ascending']]).exec()
  .then(function(result) {
    treeData.members = result;
    treeData.memberCount = result.length;
    console.log("Member count " + treeData.memberCount);
    return treeData;
  })
  .then(function(results){
      res.render('family', { title: 'Family tree', data: results});
  })
  .catch(function(err) {
    console.log('Family -> members: ' + err);
    next(err);
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
