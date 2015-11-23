var gulp		= require('gulp');
var browserSync = require('browser-sync').create();
var inject		= require('gulp-inject');
var es			= require('event-stream');
var bowerFiles	= require('main-bower-files');
var sass		= require('gulp-sass');
var sourcemaps	= require('gulp-sourcemaps');

var settings = {
	index_src: './src/index.html',
	index_dest: '.',
	scss_src: './src/scss/**/*.scss',
	scss_dest: './assets/css',
	scss_includes: ['./bower_components'],
	inject_src: ['./assets/js/**/*.js', './assets/css/**/*.css']
}

gulp.task('sass', function () {
	gulp.src(settings.scss_src)
		.pipe(sourcemaps.init())
		.pipe(sass({includePaths: settings.scss_includes}))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(settings.scss_dest))
		.pipe(browserSync.stream());
});

gulp.task('index', ['sass'], function() {
	gulp.src(settings.index_src)
		.pipe(inject(gulp.src(bowerFiles(), {read: false}), {name: 'bower'}))
		.pipe(inject(es.merge(gulp.src(settings.inject_src, {read: false})), {addRootSlash: false}))
		.pipe(gulp.dest(settings.index_dest));
});

gulp.task('serve', ['index'], function() {
	browserSync.init({
		server: settings.index_dest,
		open: false
	});

	gulp.watch(settings.scss_src, ['sass']);
	gulp.watch(settings.index_src, ['index']).on('change', browserSync.reload);
});

gulp.task('default', ['serve']);