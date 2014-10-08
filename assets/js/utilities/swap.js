module.exports = function(region, newView) {

	var processExit = function(callback) {
		var oldView = region.view;
		if (oldView) {
			oldView.unbind();
			if (oldView.model) {
				oldView.model.unbind('change', oldView.render, oldView);
			}

			var hasExit = function(callback) {
				if (oldView.beforeExit) {
					oldView.beforeExit(callback);
				} else {
					callback();
				}
			};

			hasExit(function() {
				oldView.remove();

				delete oldView.$el;
				delete oldView.el;

				callback();
			});

		} else {
			callback();
		}
	};

	processExit(function() {
		region.view = newView;
		region.html(newView.render().el);
	});

};