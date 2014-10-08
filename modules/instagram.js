var async = require('async');

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
					if (medias && medias.length) {
						medias.forEach(function(media_item) {
							redisClient.setItem('instagram-item-' + media_item.id, media_item, 99999);
						});
						redisClient.setItem('instagram-search-' + term, medias, 6);
						return callback(null, medias);
					} else {
						return callback({
							error: "no_results"
						}, null);
					}
				});
			} else {
				return callback(null, results);
			}
		});
	},
	fetch: function(media_id, callback) {
		redisClient.getItem('instagram-item-' + media_id, function(err, result) {
			if (err || !result) {
				ig.media(media_id, function(err, media) {
					if (err) {
						return callback(err, null);
					}
					if (!media) {
						redisClient.setItem('instagram-item-' + media_id, media, 99999);
						return callback(null, media);
					} else {
						return callback({
							error: "no_results"
						}, null);
					}
				});
			} else {
				return callback(null, result);
			}
		});
	},
	populateItems: function(items, callback) {
		var results = items;
		async.map(items.map(function(item) {
			return item.media_id;
		}), this.fetch, function(err, items) {
			if (err) {
				return callback(err, null);
			}
			results = results.map(function(result) {
				items.forEach(function(item) {
					if (item.id == result.media_id) {
						result.media = item;
					}
				});
				return result;
			});
			return callback(null, results);
		});
	}
};