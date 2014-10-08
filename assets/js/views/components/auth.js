// libraries
var Backbone = require('backbone');
var $ = require('jquery');
Backbone.$ = $;

// templates
var template = require('./../../../templates/components/auth.html');

module.exports = Backbone.View.extend({

	initialize: function(options) {
		options = options || {};
		this.user = options.user;
		this.router = options.router;
	},

	events: {
		"click #logout": "logout"
	},

	logout: function() {
		this.router.navigate('logout', {
			trigger: true
		});
	},

	render: function() {
		this.$el.html(template({
			user: this.user
		}));
		return this;
	}
});