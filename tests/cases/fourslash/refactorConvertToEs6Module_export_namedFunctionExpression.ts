/// <reference path='fourslash.ts' />

// @allowJs: true

// @Filename: /a.js
////exports.f = function g() { g(); }
////exports.h = function h() { h(); }

verify.codeFix({
    description: "Convert to ES6 module",
    newFileContent:
`export const f = function g() { g(); };
export function h() { h(); }`,
});
