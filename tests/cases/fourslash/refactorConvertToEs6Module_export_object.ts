/// <reference path='fourslash.ts' />

// @allowJs: true
// @target: esnext

// @Filename: /a.js
////module.exports = {
////    x: 0,
////    f: function() {},
////    g: () => {},
////    h() {},
////    C: class {},
////};

// @Filename: /b.js
////const a = require("./a.js");

verify.codeFix({
    description: "Convert to ES6 module",
    newFileContent:
`export const x = 0;
export function f() { }
export function g() { }
export function h() { }
export class C { }`,
});
