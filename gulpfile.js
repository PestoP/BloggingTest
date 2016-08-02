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
  gulp.src("client/templates/**/*.jade")
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

// Repère les changements dans ces dossiers
gulp.task('watch', function() {
    gulp.watch('client/**/*.js', ['scripts']);
    gulp.watch('client/**/*.scss', ['styles']);
    gulp.watch('client/**/*.jade', ['templates']);
});

//tâche exécuté par défaut
gulp.task("default", ["scripts", "styles", "templates", "watch"], function() {
  gulp.watch("client/**/*", ["scripts", "styles", "templates", "watch"])
})