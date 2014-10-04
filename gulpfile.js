var gulp = require('gulp');
var livereload = require('gulp-livereload');
var sass = require('gulp-sass');
var watch = require('gulp-watch');
var autoprefix = require('gulp-autoprefixer');
var clean = require('gulp-clean');
var globbing = require('gulp-css-globbing');

// CSS concat, auto-prefix and minify
gulp.task('sass', function() {
	gulp.src(['./assets/sass/*.css.scss'])
		.pipe(sass())
		.pipe(autoprefix('last 2 versions'))
		.pipe(gulp.dest('./public/css/'))
		.pipe(livereload());
});

// default gulp task
gulp.task('default', ['sass'], function() {
	// watch for CSS changes
	gulp.watch('./assets/sass/*.scss', ['sass']);
});
