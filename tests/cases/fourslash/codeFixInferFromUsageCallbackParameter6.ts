/// <reference path='fourslash.ts' />

// @allowJs: true
// @checkJs: true
// @noImplicitAny: false

// @filename: /foo.js
////const foo = [(/** @type {number} */ x) => x + 1];

verify.not.codeFixAvailable();
