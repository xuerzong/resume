const gulp = require('gulp')
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss')
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

const htmlmin = require('gulp-htmlmin')

gulp.task('css', () => 
  gulp.src('./styles/**/*.scss')
  .pipe(sass().on('error', sass.logError))
  .pipe(postcss([
    autoprefixer(),
    cssnano()
  ]))
  .pipe(gulp.dest('dist/styles'))
)

gulp.task('html-minify', () =>
  gulp.src('./dist/index.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('dist'))
)