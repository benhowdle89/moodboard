var redis = require('redis');
var url = require('url');
var redisURL = url.parse(process.env.REDISCLOUD_URL);
var HOURS = 1 * 60 * 60;
var instance = null;

module.exports = {
	init: function() {
		var client = redis.createClient(redisURL.port, redisURL.hostname, {
			no_ready_check: true
		});
		if (redisURL.auth) {
			client.auth(redisURL.auth.split(":")[1]);
		}
		client.on("error", function(err) {
			console.log("Error " + err);
		});
		instance = client;
		return instance;
	},
	getItem: function(key, callback) {
		instance.get(key, function(err, result) {
			if (err) {
				return callback(err, null);
			}
			if (!result) {
				return callback(null, null);
			}
			result = JSON.parse(result);
			return callback(null, result);
		});
	},
	setItem: function(key, value, expiry) {
		var toRedis = JSON.stringify(value);
		instance.setex(key, HOURS * expiry, toRedis);
	}
};