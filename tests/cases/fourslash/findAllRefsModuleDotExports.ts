/// <reference path='fourslash.ts' />

// @allowJs: true

// @Filename: /a.js
/////*1*/const b = require("/*2*/./b");

// @Filename: /b.js
/////*3*/module.exports = 0;

verify.baselineFindAllReferences('1', '2', '3');
