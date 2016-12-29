// var gulp = require('gulp');

var handleError = function(err) {
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
var changed = require('gulp-changed');

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
    livereload = require('gulp-livereload'),
    del = require('del');


var DEST = 'dist/AirUI';
var SRC = 'src/module/**/*.js'

gulp.task('default', function() {

    del.sync(['dist/']);
    gulp.src(SRC)
        // .pipe(jshint('.jshintrc'))
        // .pipe(jshint.reporter('default'))
        // .pipe(changed(DEST, { hasChanged: changed.compareSha1Digest }))
        // .pipe(gulp.dest(DEST))
        // .pipe(rename({ suffix: '.min' }))
        .pipe(uglify({ mangle: { except: 'require' } }).on('error', gutil.log))
        .pipe(gulp.dest(DEST))
        .pipe(notify({ message: 'Scripts task complete' }));



    // var combined = combiner.obj([
    //      gulp.src(SRC),
    //      changed(DEST),
    //      gulp.dest(DEST),
    //      rename({suffix: '.min'}),
    //      uglify(),
    //      gulp.dest(DEST),
    //     notify({ message: 'Scripts task complete' })
    //    ]);
    //
    //
    //     combined.on('error', handleError)
});
