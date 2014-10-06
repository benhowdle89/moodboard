var config = require('./../config.json');

var redisClient = require('./redis');
redisClient.init();

var ig = require('instagram-node').instagram();
ig.use(config.instagram);

module.exports = {
	search: function(term, callback) {
		redisClient.getItem('instagram-search-' + term, function(err, results) {
			if (err || !results) {
				ig.tag_media_recent(term, function(err, medias, pagination, remaining, limit) {
					if (err) {
						return callback(err, null);
					}
					redisClient.setItem('instagram-search-' + term, medias, 1);
					return callback(null, medias);
				});
			} else {
				return callback(null, results);
			}
		});
	}
};