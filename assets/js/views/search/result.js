// libraries
var Backbone = require('backbone');
var $ = require('jquery');
Backbone.$ = $;

// templates
var template = require('./../../../templates/search/result.html');

module.exports = Backbone.View.extend({
	initialize: function(options) {
		options = options || {};
		this.result = options.result;
		this.user = options.user;
		this.parent = options.parent;
	},

	render: function() {
		this.$el.html(template({
			result: this.result,
			user: this.user
		}));
		return this;
	}
});