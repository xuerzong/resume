const path = require('path')
const gulp = require('gulp')
const sass = require('gulp-sass')(require('sass'))
const postcss = require('gulp-postcss')
const autoprefixer = require('autoprefixer')
const cssnano = require('cssnano')
const { OUTPUT_PATH } = require('./constants/path')

gulp.task('images', () => {
  return gulp.src('./assets/images/*')
      .pipe(gulp.dest(path.resolve(OUTPUT_PATH, 'images')))
});

gulp.task('css', () => {
  const postcssPlugins = [autoprefixer(), cssnano()]
  return gulp.src('./styles/index.scss')
  .pipe(sass().on('error', sass.logError))
  .pipe(postcss(postcssPlugins))
  .pipe(gulp.dest(`${OUTPUT_PATH}/styles`))
})