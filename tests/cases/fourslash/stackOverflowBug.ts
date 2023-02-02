/// <reference path='fourslash.ts'/>
// @allowJs: true

// @Filename: bar.js
//// module.exports = function () {};
//// exports.blah = exports.unknown;

// @Filename: foo.js
//// var bar = require("./bar");
//// bar./**/



// verify.completions({ excludes: undefined });

verify.baselineCompletions();
