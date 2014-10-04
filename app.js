var express = require('express');
var http = require('http');
var path = require('path');
var hbs = require('hbs');
var mongoose = require('mongoose');
var mongodb = require('mongodb');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var gravatar = require('gravatar');

var userModel = require('./models/user.js');

var app = express();

app.set('port', process.env.PORT || 5000);

var mongoUri = 'mongodb://localhost/moodboard';

if (process.env.NODE_ENV == 'production') {
	mongoUri = process.env.MONGOLAB_URI;
}

app.db = mongoose.connect(mongoUri);

app.set('views', __dirname + '/public');
app.set('view engine', 'html');
app.engine('html', hbs.__express);
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res) {
	res.render('index.html');
});

http.createServer(app).listen(app.get('port'), function() {
	console.log("Express server listening on port " + app.get('port'));
});