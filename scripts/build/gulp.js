// @ts-check
/**
 * @typedef {import("gulp").Gulp} Gulp
 * @typedef {import("gulp-help").GulpHelp} GulpHelp
 * @typedef {GulpHelp & { Gulp: new () => Gulp }} DotGulpModule
 * @type {DotGulpModule}
 */
module.exports = require("gulp-help")(require("gulp"));