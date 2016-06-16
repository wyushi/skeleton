'use strict';

module.exports = function (gulp, plugins) {
  var jshint  = plugins.jshint;
  var nodemon = plugins.nodemon;

  var serverPath = '../server-side/';

  var serverSideJsFiles = [
    serverPath + '**/*.js',
    '!' + serverPath + 'node_modules/**/*.js',
    '!' + serverPath + '**/tests/**/*.js',
    '!' + serverPath + '**/*.spec.js'
  ];

  /** lint:server - check server side JS errors */
  gulp.task('lint:server', function () {
    return gulp.src(serverSideJsFiles)
      .pipe(jshint())
      .pipe(jshint.reporter('default'));
  });

  return function () {
    nodemon({
      script: serverPath + 'server.js',
      ext: 'js',
      execMap: {
        'js': 'babel-node --presets=es2015'
      },
      watch: serverPath + '**/*.js',
      legacyWatch: true,
      ignore: ['tests/', 'node_modules/']
    })
    .on('change', ['lint:server'])
    .on('restart', function () {
      console.log('\x1b[32mrestarted!\x1b[0m');
    });
  };
};
