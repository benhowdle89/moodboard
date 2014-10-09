// libraries
var Backbone = require('backbone');
var $ = require('jquery');
Backbone.$ = $;

// templates
var footerTemplate = require('./../../../templates/home/index.html');

module.exports = Backbone.View.extend({

	initialize: function(options) {
		options = options || {};
		this.router = options.router;
	},

	render: function() {
		this.$el.html(footerTemplate());
		return this;
	}
});