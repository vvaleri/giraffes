const { src, dest } = require('gulp');
const gulp = require('gulp');
const browsersync = require('browser-sync').create();
const scss = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const groupMedia = require('gulp-group-css-media-queries');
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const webphtml = require('gulp-webp-html');
// const babel = require('gulp-babel');
const fileinclude = require('gulp-file-include');
const cleanCss = require('gulp-clean-css');
const rename = require('gulp-rename');
// const uglify = require('gulp-uglify-es').default;
const webpackStream = require('webpack-stream');
const webpackConfig = require('./webpack.config.js');

function browserSync() {
  browsersync.init({
    server: {
      baseDir: './dist/',
      index: 'index.html',
    },
    notify: false,
  });
}

function html() {
  return src('src/*.html')
    .pipe(fileinclude())
    .pipe(webphtml())
    .pipe(dest('dist/'))
    .pipe(browsersync.stream());
}

function css() {
  return src('src/scss/style.scss')
    .pipe(
      scss({
        outputStyle: 'expanded',
      }),
    )
    .pipe(
      groupMedia(),
    )
    .pipe(
      autoprefixer({
        grid: true,
        overrideBrowserslist: ['last 5 versions'],
        cascade: true,
      }),
    )
    .pipe(dest('dist/css/'))
    .pipe(cleanCss())
    .pipe(
      rename({
        extname: '.min.css',
      }),
    )
    .pipe(dest('dist/css/'))
    .pipe(browsersync.stream());
}

function images() {
  return src('src/img/**/*.{jpg,png,svg,gif,ico,webp}')
    .pipe(
      webp({
        quality: 90,
      }),
    )
    .pipe(dest('dist/img/'))
    .pipe(src('src/img/**/*.{jpg,png,svg,gif,ico,webp}'))
    .pipe(
      imagemin({
        progressive: true,
        svgoPlugins: [{ removeViewBox: false }],
        interlaced: true,
        optimizationLevel: 2,
      }),
    )
    .pipe(dest('dist/img/'))
    .pipe(browsersync.stream());
}

function js() {
  return src('src/js/main.js')
    .pipe(webpackStream(webpackConfig))
    .pipe(dest('dist/js'));
}

function watchFiles() {
  gulp.watch(['src/**/*.html'], html);
  gulp.watch(['src/scss/**/*.scss'], css);
  gulp.watch(['src/img/**/*.{jpg,png,svg,gif,ico,webp}'], images);
  gulp.watch(['src/js/**/*.js'], js);
}

const build = gulp.series(gulp.parallel(js, css, html, images));
const watch = gulp.parallel(build, watchFiles, browserSync);

exports.js = js;
exports.images = images;
exports.css = css;
exports.html = html;
exports.build = build;
exports.watch = watch;
exports.default = watch;
