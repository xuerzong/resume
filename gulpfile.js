const gulp = require('gulp')
const htmlmin = require('gulp-htmlmin')

gulp.task('html-minify', () =>
  gulp.src('./build/index.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('dist'))
)