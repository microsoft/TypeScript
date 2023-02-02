/// <reference path='fourslash.ts'/>
// @allowJs: true

// @Filename: bar.js
//// module.exports = function () {};
//// var v = exports.unknown
//// exports.blah = v

// @Filename: foo.js
//// var bar = require("./bar");
//// bar./**/



// verify.completions({ excludes: undefined });

verify.baselineCompletions();
