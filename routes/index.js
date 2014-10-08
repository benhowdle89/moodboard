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
		if (!req.body.name) {
			return status(404).end();
		}
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
		if (!req.body.media_id || !req.params.id) {
			return status(404).end();
		}
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
	getBoards: function(req, res, next) {
		boardModel.find({
			user_id: req.user._id
		}, function(err, results) {
			if (err) {
				return next(err);
			}
			return res.status(200).send(results);
		});
	},
	getBoardItems: function(req, res, next) {
		if (!req.params.id) {
			return status(404).end();
		}
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
			instagram.populateItems(items, function(err, results) {
				if (err) {
					return res.status(404).end();
				}
				return res.status(200).send(results).end();
			});
		});
	},
	getUserItems: function(req, res, next) {
		var data = {
			user_id: req.user._id
		};
		itemModel.find(data).lean().populate('board_id').exec(function(err, items) {
			if (err) {
				return next(err);
			}
			if (!items) {
				return res.status(404).end();
			}
			instagram.populateItems(items, function(err, results) {
				if (err) {
					return res.status(404).end();
				}
				return res.status(200).send(results).end();
			});
		});
	}

};