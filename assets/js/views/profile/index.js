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
		this.items = options.items;
		this.boards = options.boards;
	},
	render: function() {
		this.$el.html(template({
			user: this.user,
			items: this.items.toJSON(),
			boards: this.boards.toJSON()
		}));
		return this;
	}
});