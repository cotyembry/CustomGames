var gulp = require('gulp');
var shell = require('shelljs');

gulp.task('gulp-watch', function() {
	gulp.watch('./src/*.jsx', ['webpack'])
})

gulp.task('webpack', function() {
	shell.exec('webpack')
})