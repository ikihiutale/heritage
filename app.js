'use strict';

var express = require('express');
var mongoose = require('mongoose');
// Parses the body portion of an incoming HTTP request
var path = require('path');
var favicon = require('serve-favicon');

// An HTTP request logger middleware for node
var logger = require('morgan');

// Used to parse the cookie header and populate req.cookies
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// Files for dealing routes
var index = require('./routes/index');
var family = require('./routes/family');

var app = express();

//Set up DB connection
mongoose.connect(process.env.DBURL, {});
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.on('connected', console.error.bind(console, 'MongoDB connected'));
db.on('disconnected', console.error.bind(console, 'MongoDB disconnected'));

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Add the middleware libraries into the request handling chain
app.use(favicon(path.join(__dirname, 'public/images', 'favicon.png')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/static', express.static(path.join(__dirname, 'public')));

// Add route-handling code to the request handling chain in order to 
// to define particular routes for the different parts of the site
app.use('/', index);
app.use('/family', family);

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Error handler
app.use(function(err, req, res, next) {
  // Set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Render the error page
  res.status(err.status || 500);
  res.render('error');
});

// Express application fully configured
module.exports = app;
