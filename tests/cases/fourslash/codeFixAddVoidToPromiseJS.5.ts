/// <reference path='fourslash.ts' />

// @target: esnext
// @lib: es2015
// @strict: true
// @allowJS: true
// @checkJS: true
// @filename: main.js
/////** @type {Promise<number>} */
////const p2 = new Promise(resolve => resolve());

verify.not.codeFixAvailable("Add 'void' to Promise resolved without a value");
