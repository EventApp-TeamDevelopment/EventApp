'use strict';


const gulp          = require('gulp');
const htmlmin       = require('gulp-htmlmin');
const cssmin        = require('gulp-cssmin');
const uglify        = require('gulp-uglify');
const concat        = require('gulp-concat');
const babel         = require('gulp-babel');
const sass          = require('gulp-sass');
const jslint        = require('gulp-jslint');
const autoprefixer  = require('gulp-autoprefixer');
const sourcemaps    = require('gulp-sourcemaps');
const livereload    = require('gulp-livereload');
const gulpIf        = require('gulp-if');
const del           = require('del');
const cached        = require('gulp-cached');
const remember      = require('gulp-remember');
const path          = require('path');
const templateCache = require('gulp-angular-templatecache');
const minify        = require('gulp-minify');


// will add sourcemaps only in development version
const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';


// jslint
// Compress images (gulp-imagemin)
// Caching of images so only changed images are compressed (gulp-cache)
// Notify of changes (gulp-notify)




/*          *******  GENERAL TASKS  *******               */


// default task
gulp.task('default', [

    'templates',
    'styles',
    'scripts',
    'watch'

]);


// Rerun the task when a file changes


gulp.task('watch', () => {
    livereload.listen();

gulp.watch('src/css/**/*.{scss,css}', ['styles']).on('unlink', (filepath) => {
    remember.forget('styles', path.resolve(filepath));
});

gulp.watch('src/js/**/*.js', ['scripts']).on('unlink', (filepath) => {
    remember.forget('scripts', path.resolve(filepath));
});

gulp.watch('src/templates/**/*.html', ['templates']);

});



// task will delete everything from public folder


// gulp.task('clean', () => {
//   del('public');
// });


/*          *******  HTML TEMPLATES TASKS  *******            */




gulp.task('templates', function () {
    return gulp.src('src/templates/**/*.html')
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(templateCache({
            module: 'mainApp'
        }))
        .pipe(gulp.dest('public/js'));
});




/*             *******  CSS TASKS  *********             */



gulp.task('styles', () => {
    return gulp.src('src/css/**/*.{scss,css}')
        .pipe(cached('styles'))
        .pipe(sass().on('error', sass.logError))
        .pipe(gulpIf(isDevelopment, sourcemaps.init()))
        .pipe(autoprefixer())
        .pipe(remember('styles'))
        .pipe(concat('style.css'))
        .pipe(cssmin())
        .pipe(gulpIf(isDevelopment, sourcemaps.write('.')))
        .pipe(gulp.dest('public/css'))
        .pipe(livereload());
});




/*        *******  JAVASCRIPT TASKS  *******           */




gulp.task('scripts', () => {
    return gulp.src('src/js/**/*.js')
        .pipe(cached('scripts'))
        .pipe(gulpIf(isDevelopment, sourcemaps.init()))
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(remember('scripts'))
        .pipe(concat('app.js'))
        //.pipe(gulpIf(isDevelopment, sourcemaps.write('.')))
        //.pipe(uglify())
        .pipe(minify())
        .pipe(gulp.dest('public/js'));
});



/*            *******  ASSETS TASKS  *******             */



//
//
//
//
