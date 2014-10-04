// libraries
var Backbone = require('backbone');

// internal modules
var appRouter = require('./routers/app-router');

new appRouter(function() {
	Backbone.history.start({
		pushState: true
	});
});