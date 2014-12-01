/**
 * Created by banama on 14-12-1.
 */
var gulp = require('gulp');
var jshint = require('gulp-jshint');

gulp.task('jshint', function () {
    return gulp.src('src/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});