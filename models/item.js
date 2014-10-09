var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var ItemSchema = new Schema({
	media_id: String,
	user_id: {
		type: ObjectId,
		ref: 'User'
	},
	board_id: {
		type: ObjectId,
		ref: 'Board'
	},
	createdAt: {
		type: Date,
		default: Date.now
	}
});

module.exports = mongoose.model('Item', ItemSchema);