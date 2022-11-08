///<reference path="fourslash.ts" />

// @allowJs: true
// @Filename: a.js

/////** /*1*/@typedef {number} /*2*/T */

/////*3*/const /*4*/T = 1;

/////** @type {/*5*/T} */
////const n = /*6*/T;

verify.baselineFindAllReferences('1', '2', '3', '4', '5', '6');
