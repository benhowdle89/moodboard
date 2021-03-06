// libraries
var Backbone = require('backbone');
var $ = require('jquery');
Backbone.$ = $;

// templates
var footerTemplate = require('./../../../templates/layout/footer.html');

module.exports = Backbone.View.extend({
	render: function(){
		this.$el.html(footerTemplate());
		return this;
	}
});