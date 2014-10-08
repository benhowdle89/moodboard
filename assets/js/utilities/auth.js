var $ = require('jquery');

var settings = require('./../config/settings');

module.exports = {
	user: null,
	check: function(callback) {
		var xhr = $.ajax({
			url: settings.apiURL + 'check-auth',
			success: function(data) {
				if (xhr.status == 200) {
					this.user = data;
					callback(this.getUser());
				}
			}.bind(this),
			error: function() {
				if (xhr.status == 401) {
					callback(null);
				}
			}
		});
	},
	getUser: function() {
		return this.user;
	},
	logout: function(callback) {
		var xhr = $.ajax({
			url: settings.apiURL + 'logout',
			success: function(data) {
				if (xhr.status == 200) {
					this.user = null;
					callback();
				}
			}.bind(this)
		});
	}
};