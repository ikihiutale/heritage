'use strict';

var mongoose = require('mongoose');
var Member = require('../models/member');
var familyTreeData = require('../db/family_tree.json')
var async = require('async');

//GET: display family tree page
exports.tree = function(req, res, next) {
  var memberId = req.params.memberId;
  var treeData = {};
  
  // Find members
  Member.find().sort([['lastName', 'ascending']]).exec()  
  .then(function(memberObjs) {
    treeData.memberObjs = memberObjs;
    treeData.memberCount = memberObjs.length;

    // Find member
    return Member.findById(memberId).exec();
  })
  
  // Find siblings
  .then(function(memberObj) {
    treeData.memberObj = memberObj;
    return Member.find().or([
      { $and: [{father: memberObj.father}, {father: {$ne: null}}, {id: {$ne: memberObj.id}}]},
      { $and: [{mother: memberObj.mother}, {mother: {$ne: null}}, {id: {$ne: memberObj.id}}]}
    ]).exec();
  })

  // Find mother
  .then(function(siblingObjs) {
    if (siblingObjs.length) {
      siblingObjs.splice(Math.round((siblingObjs.length - 1) / 2), 0, treeData.memberObj);
    }
    else {
      siblingObjs.push(treeData.memberObj);
    }
    treeData.siblingObjs = siblingObjs;
    return Member.findOne({id: treeData.memberObj.mother}).exec();
  })

  // Find father
  .then(function(motherObj) {
    treeData.motherObj = motherObj;
    return Member.findOne({id: treeData.memberObj.father}).exec();    
  })

  // Find mother's parents
  .then(function(fatherObj) {
    treeData.fatherObj = fatherObj;
    var motherId = (treeData.motherObj != null ? treeData.motherObj.mother : null);
    var fatherId = (treeData.motherObj != null ? treeData.motherObj.father : null);
    return Member.findOne({id: { $in : [motherId, fatherId]}}).exec();
  })

  // Find father's parents
  .then(function(motherParentObjs) {
    treeData.motherParentObjs = motherParentObjs;
    var motherId = (treeData.fatherObj  != null ? treeData.fatherObj.mother : null);
    var fatherId = (treeData.fatherObj  != null ? treeData.fatherObj.father : null);
    return Member.find({id: { $in : [motherId, fatherId]}}).exec();
  })

  // Find father's parents
  .then(function(fatherParentObjs) {
    treeData.fatherParentObjs = fatherParentObjs;
    
    console.log("MEMBER OBJ " + treeData.memberObj);
    console.log("MEMBER COUNT " + treeData.memberCount);
    console.dir("SIBLINGS OBJs " + treeData.siblingObjs);
    console.log("FATHER OBJ " + treeData.fatherObj + ", " + (treeData.fatherObj ? treeData.fatherObj.id : " "));
    console.log("MOTHER OBJ " + treeData.motherObj  + ", " + (treeData.motherObj ? treeData.motherObj.id : " "));
    
    res.render('family', { title: 'Family tree', data: treeData});
  })
  .catch(function(err) {
    console.log('Error: ' + err);
    next(err);
  });
};

//GET: list of members
exports.members = function(req, res, next) {
  var treeData = {};
  Member.find().sort([['lastName', 'ascending']]).exec()
  .then(function(result) {
    treeData.memberObjs = result;
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
