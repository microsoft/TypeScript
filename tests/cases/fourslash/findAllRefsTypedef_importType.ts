/// <reference path='fourslash.ts' />

// @allowJs: true

// @Filename: /a.js
////module.exports = 0;
/////** /*1*/@typedef {number} /*2*/Foo */
////const dummy = 0;

// @Filename: /b.js
/////** @type {import('./a')./*3*/Foo} */
////const x = 0;

verify.baselineFindAllReferences('1', '2', '3');
