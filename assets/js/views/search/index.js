// libraries
var Backbone = require('backbone');
var $ = require('jquery');
Backbone.$ = $;

// templates
var template = require('./../../../templates/search/index.html');

module.exports = Backbone.View.extend({
	initialize: function(options) {
		options = options || {};
		this.data = options.data;
	},
	render: function() {
		this.$el.html(template());
		return this;
	}
});