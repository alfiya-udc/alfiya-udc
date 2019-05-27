'use strict';
var gulp = require("gulp");
var sass = require("gulp-sass");
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var server = require("browser-sync");
var mqpacker = require("css-mqpacker");
var minify = require("gulp-csso");
var rename = require("gulp-rename");
var imagemin = require("gulp-imagemin");
var del = require("del");

gulp.task("clean", function() {
    return del("build");
});

gulp.task("sass", function(){
    return gulp.src("sass/style.scss")
    .pipe(plumber())
    .pipe(sass())
    .pipe(postcss([
        autoprefixer(),
        mqpacker({
            sort: true
        })
    ]))
    .pipe(gulp.dest("css"))
    .pipe(minify())
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest("css"))
    //.pipe(server.reload({stream: true}))
});

gulp.task("images", function() {
    return gulp.src("img/**/*.{png,jpg,gif}")
        .pipe(imagemin([
            imagemin.optipng({optimizationLevel: 3}),
            imagemin.jpegtran({progressive: true})
        ]))
        .pipe(gulp.dest("img"));
});
gulp.task("copy", function() {
    return gulp.src([
        "fonts/**/*.{woff,woff2}",
        "img/**",
        "js/**",
        "*.html"
    ], {
        base: "."
    })
    .pipe(gulp.dest("build"));
});
gulp.task("serve", function () {
    server.init({
        server: ".",
        notify: false,
        open: true,
        cors: true,
        ui: false
    });

    gulp.watch("sass/**/*.scss", gulp.series("sass"));
    gulp.watch("*.html", gulp.series("refresh"));
});

gulp.task("refresh", function (done) {
    server.reload();
    done();
  });

gulp.task("build", gulp.series(
    "clean",
    "copy",
    "sass",
  ));





gulp.task("start", gulp.series("build", "serve"));