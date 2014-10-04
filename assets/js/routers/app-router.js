// libraries
var Backbone = require('backbone');
var $ = require('jquery');

// internal modules
var regions = require('./../utilities/regions.js');

// views
var headerView = require('./../views/layout/header.js');
var footerView = require('./../views/layout/footer.js');

module.exports = Backbone.Router.extend({
	initialize: function(callback){
		this.renderLayout();
		callback();
	},

	renderLayout: function(){
		regions.header = $('[data-js-region="header"]');
		regions.footer = $('[data-js-region="footer"]');
		this.renderHeader();
		this.renderFooter();
	},

	renderHeader: function(){
		regions.header.html(new headerView().render().el);
	},

	renderFooter: function(){
		regions.footer.html(new footerView().render().el);
	}

});