/// <reference path='fourslash.ts' />

// @allowJs: true

// @Filename: /a.js
////exports.f = async function* f(p) {}
////exports.C = class C extends D { m() {} }

verify.codeFix({
    description: "Convert to ES6 module",
    newFileContent:
`export async function* f(p) { }
export class C extends D {
    m() { }
}`,
});
