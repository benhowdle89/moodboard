// libraries
var Backbone = require('backbone');
var $ = require('jquery');
Backbone.$ = $;

// templates
var footerTemplate = require('./../../../templates/home/index.html');

module.exports = Backbone.View.extend({

	initialize: function(options) {
		options = options || {};
		this.router = options.router;
	},

	events: {
		"keyup [name='term']": function(e) {
			if (e.keyCode == 13) {
				var val = e.currentTarget.value;
				if (val) {
					this.search(val);
				}
			}
		}
	},

	search: function(term) {
		if (!term) {
			return;
		}
		this.router.navigate('search/' + term, {
			trigger: true
		});
	},

	render: function() {
		this.$el.html(footerTemplate());
		return this;
	}
});