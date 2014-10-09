var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var BoardSchema = new Schema({
	name: String,
	user_id: {
		type: ObjectId,
		ref: 'User'
	},
	createdAt: {
		type: Date,
		default: Date.now
	}
});

module.exports = mongoose.model('Board', BoardSchema);