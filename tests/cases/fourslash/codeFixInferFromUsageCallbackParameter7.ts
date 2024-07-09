/// <reference path='fourslash.ts' />

// @allowJs: true
// @checkJs: true
// @noImplicitAny: false

// @filename: /foo.js
/////** @type {(x: number) => number} */
////const foo = x => x + 1;

verify.not.codeFixAvailable();
