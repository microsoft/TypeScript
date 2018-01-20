const gulp = require("gulp");
const sourcemaps = require("gulp-sourcemaps");
const tsb = require("gulp-tsb");
const del = require("del");

const project = tsb.create("tsconfig.json")

gulp.task("clean", () => del(["dist/**/*"]));

gulp.task("build", () => gulp.src(["src/**/*.ts"])
    .pipe(sourcemaps.init())
    .pipe(project())
    .pipe(sourcemaps.write(".", { sourceRoot: "../src", includeContent: false, destPath: "dist" }))
    .pipe(gulp.dest("dist")));

gulp.task("watch", () => gulp.watch(["src/**/*", "tsconfig.json"], ["build"]));

gulp.task("default", ["build"]);