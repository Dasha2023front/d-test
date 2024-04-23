const { src, dest, series, watch } = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const csso = require("gulp-csso");
const include = require("gulp-file-include");
const del = require("del");
const autoprefixer = require("gulp-autoprefixer");
const concat = require("gulp-concat");
const sync = require("browser-sync").create();
const htmlmin = require('gulp-htmlmin');

const html = () => {
  return src("src/**.html")
    .pipe(
      include({
        prefix: "@@",
      })
    )
    .pipe(htmlmin({
      collapseWhitespace: true
    }))
    .pipe(dest("dist"));
};

const scss = () => {
  return src("src/scss/**.scss")
    .pipe(sass())
    .pipe(
      autoprefixer({
        overrideBrowserslist: ["last 2 versions"],
        cascade: false,
      })
    )
    .pipe(csso())
    .pipe(concat("index.css"))
    .pipe(dest("dist"));
};

const scripts = () => {
  return src("src/js/**.js")
  .pipe(dest('dist'))
}

const clear = () => {
  return del('dist')
}

const serve = () => {
  sync.init({
    server: './dist'
  })

  watch('src/**.html', series(html)).on('change', sync.reload)
  watch('src/scss/**.scss', series(scss)).on('change', sync.reload)
}

function copyFonts() {
  return src('src/fonts/**/*')
  .pipe(dest('dist/fonts/'))
}

function copyImages() {
  return src('src/imgs/**/*', { encoding: false })
  .pipe(dest('dist/imgs/'))
}

async function copyResources() {
  copyFonts()
  copyImages()
}

function copySlick() {
  return src('slick/**/*')
  .pipe(dest('dist/slick/'))
}

exports.build = series(clear, html, scss, scripts, copySlick, copyResources)
exports.serve = series(clear, html, scss, scripts, copySlick, copyResources, serve);
exports.clear = clear;