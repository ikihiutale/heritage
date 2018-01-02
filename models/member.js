'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MemberSchema = new Schema({
  id: {type: Number, required: true, index: { unique: true }},
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  father: {type: Number},
  mother: {type: Number}});

// Virtual for member's full name
MemberSchema.virtual('name').get(function () {
  return this.firstName + ' ' + this.lastName;
});

// Virtual for member's URL
MemberSchema.virtual('url').get(function () {
  return '/family/' + this._id;
});

// Export model
module.exports = mongoose.model('Member', MemberSchema);