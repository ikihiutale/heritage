var dbData = require('../db/family_tree.json');
var Datastore = require('nedb');
var db = new Datastore();
db.insert(dbData);