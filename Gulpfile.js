// Load plugins
var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    cssnano = require('gulp-cssnano'),
    rename = require('gulp-rename'),
    notify = require('gulp-notify'),
    livereload = require('gulp-livereload'),
    args = require('yargs').argv,
    $ = require('gulp-load-plugins')({lazy: true}),
    scripts = ['client/*.js', 'client/js/controllers/**/*.js', 'client/js/services/**/*.js'];

var prod = args.prod;

gulp.task('help', $.taskListing);

gulp.task('bundle', function(){
  return gulp.src(scripts)
              .pipe($.ngAnnotate())
              .pipe(!prod ? $.sourcemaps.init() : $.util.noop())
              .pipe($.concat('bundle.js'))
              .pipe(prod ? $.uglify() : $.util.noop())
              .pipe(!prod ? $.sourcemaps.write() : $.util.noop())
              .pipe(gulp.dest('bin/js'));
});

gulp.task('validate', function() {
    return gulp
        .src(scripts)
        .pipe($.if(args.verbose, $.print()))
        .pipe($.jscs())
        .pipe($.jshint())
        .pipe($.jshint.reporter('jshint-stylish', {verbose: true}))
        .pipe(prod ? $.jshint.reporter('fail') : $.util.noop());
});

// Styles
gulp.task('styles', function() {
  return sass('client/css/style.scss', { style: 'expanded' })
    .pipe(gulp.dest('client/css'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(cssnano())
    .pipe(gulp.dest('client/css'))
    .pipe(notify({ message: 'Styles task complete' }));
});

// Watch
gulp.task('watch', function() {
  gulp.watch('client/css/**/*.scss', ['styles']);
  livereload.listen();
  gulp.watch(['client/**']).on('change', livereload.changed);
});

gulp.task('default', ['styles', 'bundle'], function(){
    gulp.start('styles');
    gulp.watch(scripts, ['bundle']);
});
