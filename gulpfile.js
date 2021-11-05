
// gulpfile.js
var gulp = require("gulp"),
    sass = require("gulp-sass"),
    postcss = require("gulp-postcss"),
    autoprefixer = require("autoprefixer"),
    cssnano = require("cssnano"),
    sourcemaps = require("gulp-sourcemaps");
    browserSync = require("browser-sync").create();

//Paths
var paths = {
  sass: {
    src: "sass/theme.scss",
    dest: "css"
  },

  fullpageCss: {
    src: "node_modules/fullpage/dist/fullpage.css",
    dest: "css"
  },

  // bootstrap: {
  //   src: "node_modules/bootstrap/scss/bootstrap.scss",
  //   dest: "css"
  // },

  // Easily add additional paths
  // ,html: {
  //  src: '...',
  //  dest: '...'
  // }
};

function style() {
  return (
    gulp
      //.src([paths.sass.src, paths.bootstrap.src])
      .src(paths.sass.src)
      .pipe(sourcemaps.init())
      .pipe(sass())
      .on("error", sass.logError)
      .pipe(postcss([autoprefixer(), cssnano()]))
      .pipe(sourcemaps.write())
      .pipe(gulp.dest(paths.sass.dest))
      // Add browsersync stream pipe after compilation
      .pipe(browserSync.stream())
  );
}


//


// Copy file from node_modules

const arr = [
  {to: 'css', from: ['node_modules/fullpage.js/dist/fullpage.css']},
  {to: 'sass/material-icons', from: ['node_modules/@mdi/font/scss/*.scss']},
  {to: 'fonts', from: ['node_modules/@mdi/font/fonts/**']},
  {to: 'js', from: ['node_modules/fullpage.js/vendors/easings.min.js', 'node_modules/fullpage.js/vendors/scrolloverflow.min.js','node_modules/fullpage.js/dist/fullpage.min.js']}
];

function copyFiles(arr) {
  return function() {
    var commands = null;
    arr.forEach(function (object) {
      commands = commands +
        gulp
        .src(object.from)
        .pipe(gulp.dest(object.to));
    });
    return commands;
  }
}

//

// A simple task to reload the page
function reload() {
  browserSync.reload();
}

function watch() {
  browserSync.init({
    server: {
      baseDir: "./",
    }
  });
  gulp.watch("sass/**/*.scss", style);
  gulp.watch('_ak_pages/*.html').on('change', browserSync.reload)
}

exports.style = style;
exports.watch = watch;
exports.copy = copyFiles(arr);
