const gulp = require('gulp')
const sass = require('gulp-sass')(require('sass'))
const postcss = require('gulp-postcss')
const autoprefixer = require('autoprefixer')
const cssnano = require('cssnano')
const browserSync = require('browser-sync').create()
const { OUTPUT_PATH } = require('./constants/path')

const htmlmin = require('gulp-htmlmin')
const isDev = process.env.NODE_ENV === 'development'

const devPort = parseInt(process.env.PORT || 3000, 10)

gulp.task('html', async () => {
  require('./scripts/build-html')()
  return gulp.src(`${OUTPUT_PATH}/index.html`)
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest(OUTPUT_PATH))
    .pipe(browserSync.reload({
      stream: true
    }))
})

gulp.task('css', () => {
  const postcssPlugins = [autoprefixer()]
  if(!isDev) {
    postcssPlugins.push(cssnano())
  }
  return gulp.src('./styles/index.scss')
  .pipe(sass().on('error', sass.logError))
  .pipe(postcss(postcssPlugins))
  .pipe(gulp.dest(`${OUTPUT_PATH}/styles`))
  .pipe(browserSync.stream())
})

gulp.task('pdf', async () => {
  await require('./scripts/build-pdf')()
})

gulp.task('watch', () => {
  browserSync.init({
    server: `${OUTPUT_PATH}`,
    port: devPort,
    ui: false
  })
  gulp.watch([
    './index.hbs',
    './scripts/build-html.js',
  ], gulp.series('html'))
  gulp.watch('./styles/**/*.scss', gulp.series('css'))
})

gulp.task('build', gulp.series('css', 'html', 'pdf'))

gulp.task('default', gulp.series('html', 'css', 'watch'))