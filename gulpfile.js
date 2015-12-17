// var gulp = require('gulp');

var handleError = function (err) {
    var colors = gutil.colors;
    console.log('\n')
    gutil.log(colors.red('Error!'))
    gutil.log('fileName: ' + colors.red(err.fileName))
    gutil.log('lineNumber: ' + colors.red(err.lineNumber))
    gutil.log('message: ' + err.message)
    gutil.log('plugin: ' + colors.yellow(err.plugin))
}
var combiner = require('stream-combiner2')
var gutil = require('gulp-util')

var gulp = require('gulp'),  
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    //jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    clean = require('gulp-clean'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    livereload = require('gulp-livereload');

gulp.task('default', function() {  
   // gulp.src('src/module/**/*.js')
   //  // .pipe(jshint('.jshintrc'))
   //  // .pipe(jshint.reporter('default'))
   //  .pipe(gulp.dest('dist/module/'))
   //  .pipe(rename({suffix: '.min'}))
   //  .pipe(uglify())
   //  .pipe(gulp.dest('dist/module/'))
   //  .pipe(notify({ message: 'Scripts task complete' }));



    var combined = combiner.obj([
         gulp.src('src/module/**/*.js'),
         gulp.dest('dist/module/'),
         rename({suffix: '.min'}),
         uglify(),
         gulp.dest('dist/module/')
         
        ])
    notify({ message: 'Scripts task complete' })

        combined.on('error', handleError)
});