var instagram = require('./../modules/instagram');

module.exports = {
	instagramSearch: function(req, res, next) {
		instagram.search(req.body.term, function(err, results) {
			if (err) {
				return res.send(404, []);
			}
			return res.status(200).send(results);
		});
	}
};