// libraries
var Backbone = require('backbone');
var $ = require('jquery');
Backbone.$ = $;

// templates
var template = require('./../../../templates/profile/index.html');

module.exports = Backbone.View.extend({
	initialize: function(options) {
		options = options || {};
		this.user = options.user;
	},
	render: function() {
		this.$el.html(template({
			user: this.user
		}));
		return this;
	}
});