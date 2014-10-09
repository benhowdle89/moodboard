// libraries
var Backbone = require('backbone');
var $ = require('jquery');
var _ = require('lodash');

// internal modules
var regions = require('./../utilities/regions.js');
var auth = require('./../utilities/auth.js');
var swap = require('./../utilities/swap.js');
var instagram = require('./../utilities/instagram.js');

// collections
var itemsCollection = require('./../collections/items');
var boardsCollection = require('./../collections/boards');

// views
var headerView = require('./../views/layout/header.js');
var footerView = require('./../views/layout/footer.js');
var homeView = require('./../views/home/');
var profileView = require('./../views/profile/');
var searchView = require('./../views/search/');
var boardView = require('./../views/board/');

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
		"profile": "profile",
		"board/:id": "board",
		"logout": "logout"
	},

	renderLayout: function() {
		regions.header = $('[data-js-region="header"]');
		regions.footer = $('[data-js-region="footer"]');
		regions.content = $('[data-js-region="content"]');
		this.renderHeader();
		this.renderFooter();
	},

	renderHeader: function() {
		swap(regions.header, new headerView({
			user: auth.user,
			router: this
		}));
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

		var items = new itemsCollection();
		var boards = new boardsCollection();

		var collections = [items, boards];
		var complete = _.invoke(collections, 'fetch');

		$.when.apply($, complete).then(function() {
			swap(regions.content, new profileView({
				user: auth.user,
				items: items,
				boards: boards
			}));
		});
	},

	search: function(term) {
		if (!term) {
			return;
		}
		swap(regions.content, new searchView({
			user: auth.user,
			term: term
		}));
	},

	board: function(id) {
		var items = new itemsCollection();
		items.getByBoard(id);
		items.fetch({
			success: function() {
				swap(regions.content, new boardView({
					items: items,
					user: auth.user
				}));
			}
		});
	},

	logout: function() {
		auth.logout(function() {
			this.renderLayout();
			this.navigate('home', {
				trigger: true
			});
		}.bind(this));
	}

});