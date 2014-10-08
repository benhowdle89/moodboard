// libraries
var Backbone = require('backbone');
var $ = require('jquery');
Backbone.$ = $;

// templates
var template = require('./../../../templates/search/index.html');

// views
var resultView = require('./result.js');

module.exports = Backbone.View.extend({
	initialize: function(options) {
		options = options || {};
		this.data = options.data;
		this.user = options.user;
		this.sortedData = this.sortByLikes(this.data);
		console.log(this.sortedData);
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
		this.sortedData.forEach(this.renderResult.bind(this));
	},

	render: function() {
		this.$el.html(template());
		this.renderResults();
		return this;
	}
});