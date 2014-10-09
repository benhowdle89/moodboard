// libraries
var Backbone = require('backbone');
var $ = require('jquery');
Backbone.$ = $;

// internal libs
var instagram = require('./../../utilities/instagram.js');

// templates
var template = require('./../../../templates/search/index.html');

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

	renderResult: function(result) {
		this.$('[data-region="results"]').append(new resultView({
			result: result,
			parent: this,
			user: this.user
		}).render().el);
	},

	renderResults: function() {
		instagram.search(this.term, function(data) {
			this.sortedData = this.sortByLikes(data);
			this.sortedData.forEach(this.renderResult.bind(this));
		}.bind(this));
	},

	render: function() {
		this.$el.html(template());
		this.renderResults();
		return this;
	}
});