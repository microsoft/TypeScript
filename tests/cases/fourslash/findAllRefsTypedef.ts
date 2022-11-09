/// <reference path='fourslash.ts' />

// @allowJs: true

// @Filename: /a.js
/////**
//// * @typedef I {Object}
//// * /*1*/@prop /*2*/p {number}
//// */
////
/////** @type {I} */
////let x;
////x./*3*/p;

verify.baselineFindAllReferences('1', '2', '3');
