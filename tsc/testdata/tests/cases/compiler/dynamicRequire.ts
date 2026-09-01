// @target: es2015
// @allowJs: true
// @module: commonjs
// @outDir: out

// @filename: a.js
function foo(name) {
    var s = require("t/" + name)
}
