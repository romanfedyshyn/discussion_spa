var gulp = require('gulp'),
	jshint = require('gulp-jshint'),
	stylish = require('jshint-stylish');

	// concat = require('gulp-concat')
	// minify = require('gulp-minify'),
	// del = require('del');

gulp.task('jshint', function () {
	return gulp.src(['./src/app/components/*.js'])
		.pipe(jshint())
		.pipe(jshint.reporter(stylish))
		.pipe(jshint.reporter('fail'));
});

gulp.task('watch', function () {
	gulp.watch(['./src/app/components/*.js'], ['jshint']);
});