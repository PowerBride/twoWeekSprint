var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var bower = require('gulp-main-bower-files');
var sass = require('gulp-ruby-sass');
var minifyCSS = require('gulp-minify-css');
var autoprefixer = require('gulp-autoprefixer');
var del = require('del');

var paths = {
  dist: './dist',
  server: './server',
  bower: './bower_components',
  dev: './dev'
};

//minifies js, converts scss to css and minifies
gulp.task('build production', gulp.series(
  clean,
  gulp.parallel(minifyScripts, bowerScripts, styles, bowerStyles, icons)
));

//won't minify the js for easier bug-fixing
gulp.task('build', gulp.series(
  clean,
  gulp.parallel(scripts, bowerScripts, styles, bowerStyles, icons)
));

// The default task (called when you run `gulp` from cli)
gulp.task('default', gulp.series('build'));

//tasks
gulp.task(watch);
gulp.task(scripts);
gulp.task(minifyScripts);
gulp.task(styles);


function clean() {
  // You can use multiple globbing patterns as you would with `gulp.src`
  // If you are using del 2.0 or above, return its promise
  return del(['dist']);
}

function scripts(){
  return gulp.src(paths.dev + '/js/**/*.js')
  .pipe(concat('our.js'))
  .pipe(gulp.dest(paths.dist + '/js'));
}

function minifyScripts() {
  return gulp.src(paths.dev + '/js/**/*.js')
  .pipe(concat('our.js'))
  .pipe(uglify())
  .pipe(gulp.dest(paths.dist + '/js'));
}

function styles(){
  return sass(paths.dev + '/stylesheets/**/*', {style: 'compressed'})
    .on('error', sass.logError)
    .pipe(concat('our.css'))
    .pipe(autoprefixer({
            browsers: ['last 2 versions'],
          }))
    .pipe(minifyCSS())
    .pipe(gulp.dest(paths.dist + '/styles'));
}

function bowerScripts() {
  return gulp.src('./bower.json')
    .pipe(bower({
      debugging: true,
      overrides: {
        // 'bootstrap': {    //uncomment for Bootstrap use
        //   main: [
        //     './dist/js/bootstrap.js'
        //   ]
        // }, 
        'semantic': {
          main: [
            './dist/semantic.js'
          ]
        },
        'font-awesome': {
          ignore: true
        }
      }
    }))
    .pipe(concat('vendor.js'))
    .pipe(uglify())
    .pipe(gulp.dest(paths.dist + '/js'));
}

function bowerStyles(){
  return gulp.src([paths.bower + '/font-awesome/css/font-awesome.css', paths.bower + '/semantic/dist/semantic.css']) //if bootstrap is used, add it in here as well
  .pipe(concat('vendor.css'))
  .pipe(minifyCSS())
  .pipe(gulp.dest(paths.dist+ '/styles'));
}

function icons(){
  return gulp.src(paths.bower + '/font-awesome/fonts/*')
    .pipe(gulp.dest(paths.dist + '/fonts'));
}

function watch(){
  var js = paths.dev + '/js/**/*';
  var scss = paths.dev + '/stylesheets/**/*';
  gulp.watch(js, scripts);
  gulp.watch(scss, styles);
}