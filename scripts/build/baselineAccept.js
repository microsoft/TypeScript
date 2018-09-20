// @ts-check
const merge2 = require("merge2");
const gulp = require("./gulp");
const rename = require("gulp-rename");
const rm = require("./rm");
const { localBaseline, refBaseline } = require("./tests");

module.exports = baselineAccept;

function baselineAccept(subfolder = "") {
    return merge2(baselineCopy(subfolder), baselineDelete(subfolder));
}

function baselineCopy(subfolder = "") {
    return gulp.src([`${localBaseline}${subfolder ? `${subfolder}/` : ``}**`, `!${localBaseline}${subfolder}/**/*.delete`], { base: localBaseline, read: false })
        .pipe(gulp.dest(refBaseline));
}

function baselineDelete(subfolder = "") {
    return gulp.src([`${localBaseline}${subfolder ? `${subfolder}/` : ``}**/*.delete`], { base: localBaseline, read: false })
        .pipe(rm())
        .pipe(rename({ extname: "" }))
        .pipe(rm(refBaseline));
}