// libraries
var Backbone = require('backbone');
var $ = require('jquery');

// internal modules
var regions = require('./../utilities/regions.js');
var auth = require('./../utilities/auth.js');
var swap = require('./../utilities/swap.js');
var instagram = require('./../utilities/instagram.js');

// views
var headerView = require('./../views/layout/header.js');
var footerView = require('./../views/layout/footer.js');
var homeView = require('./../views/home/');
var profileView = require('./../views/profile/');
var searchView = require('./../views/search/');

module.exports = Backbone.Router.extend({
	initialize: function(callback) {
		auth.check(function() {
			this.renderLayout();
			callback();
		}.bind(this));
	},

	routes: {
		"": "home",
		"home": "home",
		"search/:term": "search",
		"profile": "profile"
	},

	renderLayout: function() {
		regions.header = $('[data-js-region="header"]');
		regions.footer = $('[data-js-region="footer"]');
		regions.content = $('[data-js-region="content"]');
		this.renderHeader();
		this.renderFooter();
	},

	renderHeader: function() {
		swap(regions.header, new headerView());
	},

	renderFooter: function() {
		swap(regions.footer, new footerView());
	},

	home: function() {
		swap(regions.content, new homeView({
			router: this
		}));
	},

	profile: function() {
		if (!auth.user) {
			return this.navigate('home', {
				trigger: true
			});
		}
		swap(regions.content, new profileView({
			user: auth.user
		}));
	},

	search: function(term) {
		if (!term) {
			return;
		}
		instagram.search(term, function(data) {
			swap(regions.content, new searchView({
				data: data
			}));
		});
	}

});