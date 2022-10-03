/// <reference path='fourslash.ts' />

// @allowJs: true

// @Filename: /a.js
////module.exports = 0;
/////*1*/export type /*2*/N = number;

// @Filename: /b.js
////type T = import("./a")./*3*/N;

verify.baselineFindAllReferences('1', '2', '3');
