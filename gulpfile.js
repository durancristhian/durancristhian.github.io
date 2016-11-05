"use strict"

const browserSync = require("browser-sync").create()
const del = require("del")
const gulp = require("gulp")
const htmlmin = require("gulp-htmlmin")
const pump = require("pump")

gulp.task("build", ["minify-html"])

gulp.task("minify-html", cb => {
    pump([
        gulp.src("src/index.html"),
        htmlmin({
            collapseWhitespace: true,
            removeComments: true
        }),
        gulp.dest("./dist"),
        browserSync.stream()
    ], cb)
})

gulp.task("default", ["build"], () => {
    browserSync.init({
        open: false,
        port: 6590,
        reloadOnRestart: true,
        server: "./dist",
        ui: false
    })

    gulp.watch("src/index.html", ["minify-html"])
})
