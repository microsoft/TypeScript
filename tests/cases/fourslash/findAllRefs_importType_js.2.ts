/// <reference path='fourslash.ts' />

// @allowJs: true
// @checkJs: true

// @Filename: /a.js
////module.exports = class C {};
////module.exports./**/D = class D {};

// @Filename: /b.js
/////** @type {import("./a")} */
////const x = 0;
/////** @type {import("./a").D} */
////const y = 0;

verify.noErrors();
verify.baselineFindAllReferences("");