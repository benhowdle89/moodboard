var Backbone = require('backbone');

var settings = require('./../config/settings');
var boardModel = require('./../models/board.js');

var boardsCollection = Backbone.Collection.extend({
	url: settings.apiURL + 'boards',
	model: boardModel,
	addToBoard: function(board_id) {
		this.url = settings.apiURL + 'boards/' + board_id;
	}
});

module.exports = boardsCollection;