var config = require('./../config.json');

var async = require('async');

var ig = require('instagram-node').instagram();
ig.use(config.instagram);

module.exports = {
	search: function(term, callback){
		ig.tag_media_recent(term, function(err, medias){
			if(err){
				return callback(err, null);
			}
			if(medias && medias.length){
				return callback(null, medias);
			} else {
				return callback({
					error: "no_results"
				}, null);
			}
		});
	},
	fetch: function(media_id, callback){
		ig.media(media_id, function(err, media){
			if(err){
				return callback(err, null);
			}
			return callback(null, media);
		});
	},
	populateItems: function(items, callback){
		var results = items;
		async.map(items.map(function(item){
			return item.media_id;
		}), this.fetch, function(err, items){
			results = results.map(function(result){
				items.forEach(function(item){
					if(item.id == result.media_id){
						result.media = item;
					}
				});
				return result;
			});
			return callback(null, results);
		});
	}
};