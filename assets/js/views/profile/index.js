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
		this.groupedItems = this.groupItemsIntoBoards(this.items.toJSON());
	},

	groupItemsIntoBoards: function(items) {
		var grouped = {};

		items.forEach(function(item) {
			if (grouped[item.board_id.name] === undefined) {
				grouped[item.board_id.name] = [];
				grouped[item.board_id.name].board_id = item.board_id._id;
			}
			if (grouped[item.board_id.name].length < 4) {
				grouped[item.board_id.name].push(item);
			}
		});
		return grouped;
	},

	render: function() {
		this.$el.html(template({
			user: this.user,
			boards: this.boards.toJSON(),
			grouped: this.groupedItems
		}));
		return this;
	}
});