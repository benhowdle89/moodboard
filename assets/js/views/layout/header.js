// libraries
var Backbone = require('backbone');
var $ = require('jquery');
Backbone.$ = $;

// templates
var headerTemplate = require('./../../../templates/layout/header.html');

// views 
var authComponent = require('./../components/auth');

module.exports = Backbone.View.extend({

	initialize: function(options) {
		options = options || {};
		this.user = options.user;
		this.router = options.router;
	},

	renderAuth: function() {
		this.$('[data-region="auth"]').html(new authComponent({
			user: this.user,
			router: this.router
		}).render().el);
	},

	render: function() {
		this.$el.html(headerTemplate());
		this.renderAuth();
		return this;
	}
});