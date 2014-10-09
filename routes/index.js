var boardModel = require('./../models/board.js');
var instagram = require('./../modules/instagram');

module.exports = {
	instagramSearch: function(req, res, next){
		instagram.search(req.body.term, function(err, results){
			if(err){
				return res.status(404).end();
			}
			return res.status(200).send(results).end();
		});
	},
	createBoard: function(req, res, next){
		var boardData = {
			name: req.body.name,
			user_id: req.user._id
		};
		boardModel.findOne(boardData, function(err, doc){
			if(err){
				return next(err);
			}
			if(!doc){
				var newBoard = new boardModel(boardData);
				newBoard.save(function(err){
					if(err){
						return next(err);
					}
					return res.status(200).send(newBoard).end();
				});
			} else {
				return res.status(404).end();
			}
		});
	}
};