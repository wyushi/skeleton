var gulp          = require('gulp')
  , sourcemaps    = require('gulp-sourcemaps')
  , concat        = require('gulp-concat')
  , runSequence   = require('run-sequence')
  , nodemon       = require('gulp-nodemon')
  , plugins       = require('gulp-load-plugins')()
  , babel         = require('gulp-babel')
  , babelRegister = require('babel-core/register')
  , mocha         = require('gulp-mocha')
  , del           = require('del')

  , root  = '../'
  , generatedFile = 'all.js'
  , paths
  , serverSourceFiles
  , testSourceFiles;

paths = {
  server: root + 'server-side/',
  build:  root + 'server-side/dist/',
  tools:  root + 'tools/'
};

serverSourceFiles = [
  paths.server + '**/*.js',
  '!' + paths.server + 'node_modules/**/*.js',
  '!' + paths.server + '**/tests/**/*.js'
];

testSourceFiles = [
  paths.server + '**/*.spec.js',
  '!' + paths.server + 'node_modules/**/*.js',
];

/**
 * Load a gulp task module
 * @param  {String} task - task name
 * @return {module}
 */
function getTask(task) {
  return require('./gulp-tasks/' + task)(gulp, plugins);
}

gulp.task('unit-test', () => {
  return gulp.src(testSourceFiles)
    .pipe(mocha({
      compilers: {
        js: babelRegister
      }
    }));
});

gulp.task('dev', getTask('nodemon'));

gulp.task('compile', () => {
  return gulp.src(serverSourceFiles)
             .pipe(sourcemaps.init())
             .pipe(babel())
             .pipe(concat(generatedFile))
             .pipe(sourcemaps.write('.'))
             .pipe(gulp.dest(paths.build));
});

gulp.task('clean:dist', (callback) => {
  del(paths.build, { force: true }, callback);
});


