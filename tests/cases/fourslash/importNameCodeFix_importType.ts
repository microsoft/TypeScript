/// <reference path='fourslash.ts' />

// @allowJs: true
// @checkJs: true

// @Filename: /a.js
////export {};
/////** @typedef {number} T */

// @Filename: /b.js
/////** @type {T} */
////const x = 0;

goTo.file("/b.js");
verify.importFixAtPosition([
`/** @type {import("./a").T} */
const x = 0;`]);
