var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

// define user schema
var ItemSchema = new Schema({
	media_id: String,
	board_id: {
		type: ObjectId,
		ref: 'Board'
	},
	user_id: {
		type: ObjectId,
		ref: 'User'
	},
	createdAt: {
		type: Date,
		default: Date.now
	}
});

module.exports = mongoose.model('Item', ItemSchema);