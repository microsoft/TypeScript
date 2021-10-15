/// <reference path='fourslash.ts' />

// @allowJs: true
// @target: esnext

// @Filename: /a.js
////exports.f = function g() { g(); }
////exports.h = function h() { h(); }

verify.codeFix({
    description: "Convert to ES module",
    newFileContent:
`export const f = function g() { g(); }
export function h() { h(); }`,
});
