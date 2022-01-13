/// <reference path="./fourslash.ts" />

// @allowJs: true
// @module: commonjs
// @Filename: /library.js
//// export function aaa() {}
//// export function bbb() {}

// @Filename: /foo.js
//// var a = require("./library").aaa;
//// bbb/**/

goTo.marker();
verify.codeFixAvailable();
