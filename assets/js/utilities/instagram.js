var $ = require('jquery');

var settings = require('./../config/settings');

module.exports = {
	search: function(term, callback) {
		var xhr = $.ajax({
			url: settings.apiURL + 'instagram/search',
			type: "POST",
			data: {
				term: term
			},
			success: function(data) {
				if (xhr.status == 200) {
					callback(data);
				}
			}.bind(this),
			error: function() {
				if (xhr.status == 404) {
					callback(null);
				}
			}
		});
	}
};