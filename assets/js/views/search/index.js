// libraries
var Backbone = require('backbone');
var $ = require('jquery');
Backbone.$ = $;

// internal libs
var instagram = require('./../../utilities/instagram.js');

// templates
var template = require('./../../../templates/search/index.html');

// internal libs
var itemModel = require('./../../models/item');
var boardsCollection = require('./../../collections/boards');

// views
var resultView = require('./result.js');

module.exports = Backbone.View.extend({
	initialize: function(options) {
		options = options || {};
		this.user = options.user;
		this.term = options.term;
	},

	sortByLikes: function(items) {
		return items.sort(function(a, b) {
			if (a.likes.count < b.likes.count) {
				return 1;
			}
			if (a.likes.count > b.likes.count) {
				return -1;
			}
			return 0;
		});
	},

	saveItem: function(result, board_id) {
		this.boards.addToBoard(board_id);
		this.boards.create({
			media_id: result.id
		});
	},

	renderResult: function(result) {
		this.$('[data-region="results"]').append(new resultView({
			result: result,
			parent: this,
			user: this.user,
			boards: this.boards
		}).render().el);
	},

	renderResults: function() {
		instagram.search(this.term, function(data) {
			this.boards = new boardsCollection();
			this.boards.fetch({
				success: function() {
					this.sortedData = this.sortByLikes(data);
					this.sortedData.forEach(this.renderResult.bind(this));
				}.bind(this)
			});
		}.bind(this));
	},

	render: function() {
		this.$el.html(template());
		this.renderResults();
		return this;
	}
});