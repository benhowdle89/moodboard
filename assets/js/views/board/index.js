// libraries
var Backbone = require('backbone');
var $ = require('jquery');
Backbone.$ = $;

// templates
var template = require('./../../../templates/board/index.html');

module.exports = Backbone.View.extend({
	initialize: function(options) {
		options = options || {};
		this.user = options.user;
		this.items = options.items;
	},

	render: function() {
		this.$el.html(template({
			user: this.user,
			items: this.items.toJSON()
		}));
		return this;
	}
});