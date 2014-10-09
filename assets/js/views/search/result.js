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
		this.boards = options.boards || null;
	},

	events: {
		"click #addToBoard": function(e) {
			e.preventDefault();
			this.saveItem();
		}
	},

	saveItem: function() {
		this.parent.saveItem.call(this.parent, this.result, this.boards.first().get('_id'));
	},

	render: function() {
		this.$el.html(template({
			result: this.result,
			user: this.user
		}));
		return this;
	},

	className: "one-quarter moodboard-image moodboard-image--result"

});