var gulp = require('gulp')
  , sourcemaps = require("gulp-sourcemaps")
  , concat = require("gulp-concat")
  , runSequence = require('run-sequence')
  , nodemon = require('gulp-nodemon')
  , plugins = require('gulp-load-plugins')()
  , babel = require("gulp-babel");

var root = '../';

/**
 * Load a gulp task module
 * @param  {String} task - task name
 * @return {module}
 */
function getTask(task) {
  return require('./gulp-tasks/' + task)(gulp, plugins);
}

gulp.task("build", () => {
  return gulp.src("../server-side/server.js")
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(concat("all.js"))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("../server-side/dist"));
});

/**
 * Start server, monitor server side js file changes
 * and restart server automatically.
 */
gulp.task('dev', getTask('nodemon'));
gulp.task('develop', ['dev']);

