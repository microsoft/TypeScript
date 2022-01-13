/// <reference path="./fourslash.ts" />

// @allowJs: true
// @Filename: /library.js
//// module.exports.aaa = function() {}
//// module.exports.bbb = function() {}

// @Filename: /foo.js
//// var aaa = require("./library.js").aaa;
//// aaa();
//// /**/bbb

goTo.marker();
verify.getAndApplyCodeFix(ts.Diagnostics.Cannot_find_name_0.code);