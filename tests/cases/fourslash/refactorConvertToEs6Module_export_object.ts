/// <reference path='fourslash.ts' />

// @allowJs: true

// @Filename: /a.js
////module.exports = {
////    x: 0,
////    f: function() {},
////    g: () => {},
////    h() {},
////    C: class {},
////};

verify.codeFix({
    description: "Convert to ES6 module",
    newFileContent:
`export const x = 0;
export function f() { }
export function g() { }
export function h() { }
export class C {
}`,
});
