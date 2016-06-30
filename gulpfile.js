var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    stylish = require('jshint-stylish'),
	git = require('gulp-git');

gulp.task('jshint', function() {
    return gulp.src(['./src/app/*.js'])
        .pipe(jshint())
        .pipe(jshint.reporter(stylish))
        .pipe(jshint.reporter('fail'));
});

gulp.task('add', function(){
  return gulp.src(['./src/*.html', './src/css/*.css', './src/app/*.js', 'gulpfile.js', 'package.json', 'server.js'])
    .pipe(git.add());
});

gulp.task('commit', function(){
  return gulp.src(['./src/*.html', './src/css/*.css', './src/app/*.js', 'gulpfile.js', 'package.json', 'server.js'])
    .pipe(git.commit('hotfix'));
});

gulp.task('push-gh', function(){
  git.push('origin', 'master', function (err) {
    if (err) throw err;
  });
});

gulp.task('push-heroku', function(){
  git.push('heroku', 'master', function (err) {
    if (err) throw err;
  });
});

gulp.task('watch', function() {
    gulp.watch(['./src/app/*.js'], ['jshint']);
});
