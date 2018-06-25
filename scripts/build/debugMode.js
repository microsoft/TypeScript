// @ts-check
const gulp = require("./gulp");

exports.useDebugMode = true;

gulp.task("useDebugMode", /*help*/ false, [], (done) => { exports["useDebugMode"] = true; done(); });
gulp.task("dontUseDebugMode", /*help*/ false, [], (done) => { exports["useDebugMode"] = false; done(); });
