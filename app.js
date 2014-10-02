var express = require('express');
var http = require('http');
var path = require('path');
var hbs = require('hbs');

var app = express();

app.set('port', process.env.PORT || 5000);

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