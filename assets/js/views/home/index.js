// libraries
var Backbone = require('backbone');
var $ = require('jquery');
Backbone.$ = $;

// templates
var template = require('./../../../templates/home/index.html');

module.exports = Backbone.View.extend({

	initialize: function(options) {
		options = options || {};
	},

	render: function() {
		this.$el.html(template());
		return this;
	}
});