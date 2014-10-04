// libraries
var Backbone = require('backbone');
var $ = require('jquery');

// internal modules
var appRouter = require('./routers/app-router');

var router = new appRouter(function() {
	Backbone.history.start({
		pushState: true
	});

	if (Backbone.history && Backbone.history._hasPushState) {
		$(document).on("click", "a[href]", function(evt) {
			// if we really don't want it to use pushState, place [data-no-hijack] on the <a /> link
			if ($(this).attr('data-no-hijack') === undefined) {
				var href = $(this).attr("href").slice(1);
				evt.preventDefault();
				// use the main app-router to route to this new URL
				router.navigate(href, {
					trigger: true
				});
			}
		});
	}

});