const gulp = require('gulp');
const del = require('del');
const browserSync = require('browser-sync').create();
const webpack = require('webpack-stream');

gulp.task('html', () => {
  return gulp.src('src/**/*.html')
    .pipe(gulp.dest('build'))
    .pipe(browserSync.stream());
});

gulp.task('styles', () => {
  return gulp.src('src/css/**/*.css')
    .pipe(gulp.dest('build/css'))
    .pipe(browserSync.stream());
});

gulp.task('scripts', () => {
  return gulp.src('src/scripts/**/*.js')
    .pipe(webpack({
        mode: 'development',
        devtool: 'source-map',
        output: {
          filename: 'script.js'
        },
        module: {
          rules: [
            {
              test: /\.js?$/,
              use: 'babel-loader'
            }
          ]
        }
      }))
    .pipe(gulp.dest('build/js'))
    .pipe(browserSync.stream());
});

gulp.task('del', (c) => {
  del('build/*');
  c();
});

gulp.task('websrv', () => {
  browserSync.init({
        server: 'build'
    });

  gulp.watch('src/*.html', gulp.series('html'));
  gulp.watch('src/css/*.css', gulp.series('styles'));
  gulp.watch('src/scripts/**/*.js', gulp.series('scripts'));
});

gulp.task('run', gulp.series('del', 'html', 'styles', 'scripts', 'websrv'));
