'use strict';

var autoprefixer = require('gulp-autoprefixer');
var csso = require('gulp-csso');
var del = require('del');
var gulp = require('gulp');
var htmlmin = require('gulp-htmlmin');
var runSequence = require('run-sequence');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var postcss = require("gulp-postcss");
var filtermq = require("postcss-filter-mq");
 var cssnano = require('cssnano');
 var cleanCSS = require('gulp-clean-css');
 var rename = require('gulp-rename');
 var hash = require('gulp-hash');
 var clean = require('gulp-clean');





// Set the browser that you want to support
const AUTOPREFIXER_BROWSERS = [
    'ie >= 10',
    'ie_mob >= 10',
    'ff >= 30',
    'chrome >= 34',
    'safari >= 7',
    'opera >= 23',
    'ios >= 7',
    'android >= 4.4',
    'bb >= 10'
  ];

  // Gulp task to minify CSS files
gulp.task('styles', function () {
    return gulp.src('./src/static/css/*.css')
      // Auto-prefix css styles for cross browser compatibility
      .pipe(autoprefixer({overrideBrowserslist: AUTOPREFIXER_BROWSERS}))
      // Minify the file
      .pipe(csso())
      // Output
      .pipe(gulp.dest('./src/static'))
  });

  gulp.task('clean-scripts', function () {
    return gulp.src([
        './src/static/pwa/css/**/*.css',
        './src/static/css/**/*.css'
    ], {
        read: false,
        force: true
    })
    .pipe(clean());
});

  gulp.task('sass:prod', function () {
    return gulp.src([
            './src/static/scss/**/*.scss',
        ])
        .pipe(sass({
                includePaths: [
                        './src/static/scss',
                    ],
                sync : true
            }))
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(postcss([cssnano]))
        .pipe(gulp.dest('./src/static/css'));
  });

  gulp.task('prod-css', function() {
    return gulp.src([
            './src/static/css/main.css',
            './src/static/css/mobile.css',
        ])
        .pipe(cleanCSS({debug: true}, function(details) {
            console.log( "%s : %s -> %s", details.name, details.stats.originalSize, details.stats.minifiedSize);
        }))
        .pipe(hash()) // Add hashes to the files' names
        .pipe(gulp.dest('./src/static/pwa/css')) // Write the renamed files
        .pipe(hash.manifest('manifest.json', {
          deleteOld: true,
          sourceDir: './src/static/pwa/css'
        })) // Switch to the manifest file
        .pipe(gulp.dest('./src/static/pwa/css')); // Write the manifest file
});

gulp.task('minifycss', function() {
  return gulp.src([
          '!./src/static/css/main*.css',
          '!./src/static/css/mobile.css',
          
          './src/static/css/**/*.css',
      ])
      .pipe(cleanCSS({debug: true}, function(details) {
          console.log( "%s : %s -> %s", details.name, details.stats.originalSize, details.stats.minifiedSize);
      }))
      .pipe(rename({
          suffix: '.min'
      }))
      .pipe(gulp.dest('./src/static/pwa/css'));
});
var options = {
  regex: /min-width:(\s)*(\s)*768px|min-width:(\s)*(\s)*767px|min-width:(\s)*(\s)*992px|min-width:(\s)*(\s)*992px|min-width:(\s)*(\s)*1024px|min-width:(\s)*(\s)*1100px|min-width:(\s)*(\s)*1200px/,// decides the queries to filter
  invert: true,          // inverts the regex filter result
  keepBaseRules: true    // keep the non-media css rules
};
gulp.task( "css:mq", function () {
  gulp.src("./src/static/css/main.css")
      .pipe( postcss([ filtermq(
              options
          ) ]) )
      .pipe( rename( "mobile.css" ) )
      .pipe( gulp.dest("./src/static/css/") );
});

  gulp.task('clean', () => del(['dist']));

  gulp.task('default', function () {
    runSequence(
      //"clean-scripts",
      'sass:prod',// 'sass-amp' please add this when merge in CD
      'css:mq',
      ['minifycss',/*'ampminifycss'*/],
      'prod-css',
    );
  });