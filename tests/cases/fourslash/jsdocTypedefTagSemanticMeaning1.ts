///<reference path="fourslash.ts" />

// @allowJs: true
// @Filename: a.js

/////** @typedef {number} */
/////*1*/const /*2*/T = 1;

/////** @type {/*3*/T} */
////const n = /*4*/T;

verify.baselineFindAllReferences('1', '2', '3', '4');
