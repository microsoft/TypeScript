const gulp = require("gulp");
const gutil = require("gulp-util");
const sourcemaps = require("gulp-sourcemaps");
const tsb = require("gulp-tsb");
const mocha = require("gulp-mocha");
const del = require("del");

const project = tsb.create("tsconfig.json")

gulp.task("clean", () => del(["dist/**/*"]));

gulp.task("build", () => gulp.src(["src/**/*.ts"])
    .pipe(sourcemaps.init())
    .pipe(project())
    .pipe(sourcemaps.write(".", { sourceRoot: "../src", includeContent: false, destPath: "dist" }))
    .pipe(gulp.dest("dist")));

gulp.task("test", ["build"], () => gulp
    .src(["dist/tests/index.js"], { read: false })
    .pipe(mocha({ reporter: "min" })));

gulp.task("watch", () => gulp.watch(["src/**/*", "tsconfig.json"], ["test"]));

gulp.task("default", ["test"]);