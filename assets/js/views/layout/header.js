// libraries
var Backbone = require('backbone');
var $ = require('jquery');
Backbone.$ = $;

// templates
var headerTemplate = require('./../../../templates/layout/header.html');

module.exports = Backbone.View.extend({
	render: function(){
		this.$el.html(headerTemplate());
		return this;
	}
});