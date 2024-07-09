///<reference path="fourslash.ts" />
// @allowJs: true
// @Filename: Foo.js
/////** @type {function (this: string, string): string} */
////var f = function (s) { return /*0*/this + s; }

// NOTE: '0' should refer to both `this` and `s`,
// but currently only refers to `this`
verify.baselineFindAllReferences('0')
