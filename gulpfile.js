// fichier de config gulp
var gulp = require("gulp")
var gutil = require("gulp-util")
var plumber = require("gulp-plumber")
var sass = require("gulp-sass")
var jade = require("gulp-pug")
var options = require("minimist")(process.argv.slice(2))
var uglify = require('gulp-uglify');

// transforme le sass en css
gulp.task("styles", function() {
  gulp.src("client/styles/**/*.scss")
    .pipe(!options.production ? plumber() : gutil.noop())
    .pipe(sass({sourcemap: !options.production}))
    .pipe(gulp.dest("./dist/css/"))
})

// transforme le pug (jade) en html
gulp.task("templates", function() {
  gulp.src("client/templates/**/*.pug")
    .pipe(!options.production ? plumber() : gutil.noop())
    .pipe(jade({sourcemap: !options.production}))
    .pipe(gulp.dest("./dist/templates/"))
})

// browserify
gulp.task("scripts", function() {
  gulp.src("client/**/*.js")
    .pipe(options.production ? plumber() : gutil.noop())
    .pipe(uglify())
    .pipe(gulp.dest("./dist/scripts"))
})

gulp.task('icons', function() {
    gulp.src("node_modules/font-awesome/fonts/**.*")
      .pipe(gulp.dest("./dist/fonts/"));
});

gulp.task('bootstrap', function() {
    gulp.src("node_modules/bootstrap-sass/assets/javascripts/bootstrap.min.js")
      .pipe(gulp.dest("./dist/css/assets/javascripts"));
});

//tâche exécuté par défaut
gulp.task("default", ["scripts", "styles", "templates", "icons", "bootstrap"], function() {
  gulp.watch("client/**/*", ["scripts", "styles", "templates"])
})