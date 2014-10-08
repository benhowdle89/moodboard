var Backbone = require('backbone');

var settings = require('./../config/settings');
var itemModel = require('./../models/item.js');

var itemsCollection = Backbone.Collection.extend({
	url: settings.apiURL + 'items',
	model: itemModel
});

module.exports = itemsCollection;