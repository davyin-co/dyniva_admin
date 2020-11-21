var fs = require('fs'),
		gulp  = require('gulp')
		g     = require('gulp-load-plugins')({lazy:false});
var sourcemaps = require('gulp-sourcemaps');

// Less
gulp.task('less', function () {
  gulp.src('less/bootstrap.less')
    .pipe(sourcemaps.init())
    .pipe(g.less())
    .pipe(sourcemaps.write())
    .pipe(g.rename('bootstrap.css'))
    .pipe(gulp.dest('css/'));
});