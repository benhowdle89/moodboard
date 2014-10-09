var gulp = require('gulp');
var livereload = require('gulp-livereload');
var sass = require('gulp-sass');
var watch = require('gulp-watch');
var autoprefix = require('gulp-autoprefixer');
var clean = require('gulp-clean');
var globbing = require('gulp-css-globbing');
var source = require('vinyl-source-stream');
var watchify = require('watchify');
var browserify = require('browserify');

var hbsfy = require("hbsfy").configure({
	extensions: ["html"]
});

// CSS concat, auto-prefix and minify
gulp.task('css', function() {
	gulp.src(['./assets/sass/**/*.scss'])
		.pipe(sass())
		.pipe(autoprefix('last 2 versions'))
		.pipe(gulp.dest('./public/css/'))
		.pipe(livereload());
});

gulp.task('scripts', function() {
	var bundler = watchify(browserify('./assets/js/main.js', watchify.args));

	bundler.transform(hbsfy);

	bundler.on('update', rebundle);

	function rebundle() {
		return bundler.bundle()
			.pipe(source('app.js'))
			.pipe(gulp.dest('./public/js/')).pipe(livereload());
	}

	return rebundle();
});

// default gulp task
gulp.task('default', ['css', 'scripts'], function() {
	// watch for CSS changes
	gulp.watch('./assets/sass/**/*.scss', ['css']);
});
