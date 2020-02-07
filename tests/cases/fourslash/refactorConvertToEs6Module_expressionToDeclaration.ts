/// <reference path='fourslash.ts' />

// @allowJs: true
// @target: esnext

// @Filename: /a.js
////var C = {};
////console.log(C);
////exports.f = async function* f(p) { p; }
////exports.C = class C extends D { m() {} }

verify.codeFix({
    description: "Convert to ES6 module",
    newFileContent:
`var C = {};
console.log(C);
export async function* f(p) { p; }
const _C = class C extends D { m() { } };
export { _C as C };`,
});
