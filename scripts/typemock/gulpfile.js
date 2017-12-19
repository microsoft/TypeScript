const gulp = require("gulp");
const gutil = require("gulp-util");
const sourcemaps = require("gulp-sourcemaps");
const tsb = require("gulp-tsb");
const mocha = require("gulp-mocha");
const del = require("del");

const src = {
    compile: tsb.create("tsconfig.json"),
    src: () => gulp.src(["src/**/*.ts"]),
    dest: () => gulp.dest("dist")
};

gulp.task("clean", () => del(["dist/**/*"]));

gulp.task("build", () => src.src()
    .pipe(sourcemaps.init())
    .pipe(src.compile())
    .pipe(sourcemaps.write(".", { includeContent: false, destPath: "dist" }))
    .pipe(gulp.dest("dist")));

gulp.task("test", ["build"], () => gulp
    .src(["dist/tests/index.js"], { read: false })
    .pipe(mocha({ reporter: "dot" })));

gulp.task("watch", () => gulp.watch(["src/**/*", "tsconfig.json"], ["test"]));

gulp.task("default", ["test"]);