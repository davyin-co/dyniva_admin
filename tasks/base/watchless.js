const fs = require('fs'),
			gulp = require('gulp');

// Watch
gulp.task('watch:less', ['less'], function () {

	if (!fs.existsSync('less/')){

		console.error('See wenui/README.md(WENUI Drupal8 Theme 的创建)')

	}else{

		const lesses = [
			'less/**',
		];
		gulp.watch( lesses, ['less']);

	}
});