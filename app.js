var express = require('express');
var http = require('http');
var path = require('path');
var hbs = require('hbs');
var session = require('express-session');
var bodyParser = require('body-parser');
var MongoStore = require('connect-mongo')(session);
var mongoose = require('mongoose');
var mongodb = require('mongodb');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var gravatar = require('gravatar');

var userModel = require('./models/user.js');

var app = express();

app.use(bodyParser.urlencoded({
	extended: false
}));
app.use(bodyParser.json());

app.set('port', process.env.PORT || 5000);

var mongoUri = 'mongodb://localhost/moodboard';

if (process.env.NODE_ENV == 'production') {
	mongoUri = process.env.MONGOLAB_URI;
}

app.db = mongoose.connect(mongoUri);

app.use(session({
	secret: 'highiurgbuiarhb',
	cookie: {
		maxAge: 35000000000
	},
	store: new MongoStore({
		mongoose_connection: mongoose.connection
	}),
	saveUninitialized: true,
	resave: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.set('views', __dirname + '/public');
app.set('view engine', 'html');
app.engine('html', hbs.__express);
app.use(express.static(path.join(__dirname, 'public')));

passport.serializeUser(function(user, done) {
	done(null, user);
});

passport.deserializeUser(function(obj, done) {
	done(null, obj);
});

passport.use(new LocalStrategy({
	usernameField: 'email'
}, function(email, password, done) {
	userModel.findOne({
		email: email
	}, function(err, user) {
		if (err) {
			return done(err);
		}
		if (!user) {
			return done(null, false, {
				message: 'Unknown user ' + email
			});
		}

		user.comparePassword(password, function(err, isMatch) {
			if (err) {
				return done(err);
			}
			if (isMatch) {
				return done(null, user);
			} else {
				return done(null, false, {
					message: 'Invalid password'
				});
			}
		});
	});
}));

// routes

var routes = require('./routes/index.js');

app.post('/api/register', function(req, res, next) {
	var userData = {};
	if (!req.body) {
		return res.send(403, {
			error: "No user data supplied"
		});
	}
	if (!req.body.name) {
		return res.send(403, {
			error: "Fullname required"
		});
	} else {
		userData.name = req.body.fullname;
	}

	if (!req.body.email) {
		return res.send(403, {
			error: "Email required"
		});
	} else {
		userData.email = req.body.email;
	}

	if (!req.body.password) {
		return res.send(403, {
			error: "Password required"
		});
	} else {
		userData.password = req.body.password;
	}

	userModel.find({
		email: userData.email
	}, function(err, dupUser) {
		if (err) {
			return next(err);
		}
		if (dupUser.length) {
			return res.send(403, {
				error: "User already exists"
			});
		} else {
			var user = new userModel(userData);

			user.save(function(err) {
				if (err) {
					return next(err);
				}
				req.login(user, function(err) {
					if (err) {
						return next(err);
					}
					return res.send(200);
				});
			});
		}
	});
});

app.post('/api/login', function(req, res, next) {
	passport.authenticate('local', function(err, user, info) {
		if (err) {
			return next(err);
		}
		if (!user) {
			return res.send(403, {
				message: info.message
			});
		}
		req.logIn(user, function(err) {
			if (err) {
				return next(err);
			}
			return res.send(200);
		});
	})(req, res, next);
});

app.get('/api/check-auth', function(req, res, next) {
	if (req.isAuthenticated()) {
		var query = userModel
			.findOne({
				_id: req.user._id
			}).select();

		query.exec(function(err, user) {
			if (err) {
				return next(err);
			}
			if (user) {
				req.user = user;
				if (user.email) {
					user.avatar = gravatar.url(user.email, {
						s: '200',
						d: 'mm'
					});
				}
				res.send(200, user);
			} else {
				res.send(401);
			}

		});
	} else {
		res.status(401).end();
	}
});

app.get('/api/logout', function(req, res) {
	req.logout();
	req.session.destroy();
	res.send(200);
});

app.post('/api/instagram/search', routes.instagramSearch);
app.post('/api/boards', routes.createBoard);
app.post('/api/boards/:id', routes.addToBoard);
app.get('/api/boards/:id/items', routes.getBoardItems);

app.use(function(req, res) {
	res.render('index.html');
});

http.createServer(app).listen(app.get('port'), function() {
	console.log("Express server listening on port " + app.get('port'));
});