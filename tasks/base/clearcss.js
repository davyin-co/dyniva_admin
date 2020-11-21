var fs = require('fs'),
		gulp = require('gulp'),
		del = require('del');

// Clean
gulp.task('base:clean:css', function() {
  return del(['css/bootstrap.css']);
});