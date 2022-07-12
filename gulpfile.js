const gulp = require('gulp')
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss')
const autoprefixer = require('autoprefixer')
const cssnano = require('cssnano')
const browserSync = require('browser-sync').create();
const buildHtml = require('./scripts/build-html')

const htmlmin = require('gulp-htmlmin')
const isDev = process.env.NODE_ENV === 'development'

const devPort = parseInt(process.env.PORT || 3000, 10)
const outputPath = process.env.OUTPUT_PATH || './dist'

gulp.task('html', () => {
  buildHtml()
  return gulp.src('./dist/index.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest(outputPath))
    .pipe(browserSync.stream())
})

gulp.task('css', () => {
  const postcssPlugins = [autoprefixer()]
  if(!isDev) {
    postcssPlugins.push(cssnano())
  }
  return gulp.src('./styles/**/*.scss')
  .pipe(sass().on('error', sass.logError))
  .pipe(postcss(postcssPlugins))
  .pipe(gulp.dest(`${outputPath}/styles`))
  .pipe(browserSync.stream())
})

gulp.task('watch', () => {
  browserSync.init({
    server: `${outputPath}`,
    port: devPort,
    ui: false
  })
  gulp.watch([
    './index.html',
    './constants/**/*.js',
    './core/**/*.js',
    './scripts/build-html.js',
    './templates/**/*.html',
    './utils/**/*.js'
  ], gulp.series('html'))
  gulp.watch('./styles/**/*.scss', gulp.series('css'))
})

gulp.task('build', gulp.series('html', 'css'))

gulp.task('default', gulp.series('html', 'css', 'watch'))