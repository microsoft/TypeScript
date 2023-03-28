/// <reference path='fourslash.ts' />

// @allowJs: true

// @Filename: /a.js
/////** @enum {string} */
/////*1*/const /*2*/E = { A: "" };
/////*3*/E["A"];
/////** @type {/*4*/E} */
////const e = /*5*/E.A;

verify.baselineFindAllReferences('1', '2', '3', '4', '5');