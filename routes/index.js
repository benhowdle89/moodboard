var async = require('async');

var instagram = require('./../modules/instagram');
var boardModel = require('./../models/board');
var itemModel = require('./../models/item');

module.exports = {
	instagramSearch: function(req, res, next) {
		instagram.search(req.body.term, function(err, results) {
			if (err) {
				return res.send(404, []);
			}
			return res.status(200).send(results).end();
		});
	},
	createBoard: function(req, res, next) {
		var boardData = {
			name: req.body.name,
			user_id: req.user._id
		};
		boardModel.findOne(boardData, function(err, doc) {
			if (err) {
				return next(err);
			}
			if (!doc) {
				var newBoard = new boardModel(boardData);
				newBoard.save(function(err) {
					if (err) {
						return next(err);
					}
					return res.status(200).send(newBoard).end();
				});
			} else {
				return res.status(404).end();
			}
		});
	},
	addToBoard: function(req, res, next) {
		var itemData = {
			board_id: req.params.id,
			media_id: req.body.media_id,
			user_id: req.user._id
		};
		itemModel.findOne(itemData, function(err, doc) {
			if (err) {
				return next(err);
			}
			if (!doc) {
				var newItem = new itemModel(itemData);
				newItem.save(function(err) {
					if (err) {
						return next(err);
					}
					return res.status(200).send(newItem).end();
				});
			} else {
				return res.status(404).end();
			}
		});
	},
	getBoardItems: function(req, res, next) {
		var data = {
			board_id: req.params.id
		};
		itemModel.find(data).lean().populate('board_id').exec(function(err, items) {
			if (err) {
				return next(err);
			}
			if (!items) {
				return res.status(404).end();
			}
			var results = items;
			async.map(items.map(function(item) {
				return item.media_id;
			}), instagram.fetch, function(err, items) {
				if (err) {
					return next(err);
				}
				results = results.map(function(result) {
					items.forEach(function(item) {
						if (item.id == result.media_id) {
							result.media = item;
						}
					});
					return result;
				});
				return res.status(200).send(results).end();
			});
		});
	}
};