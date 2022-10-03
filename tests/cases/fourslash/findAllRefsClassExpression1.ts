/// <reference path='fourslash.ts' />

// @allowJs: true

// @Filename: /a.js
////module.exports = class /*0*/A {};

// @Filename: /b.js
////import /*1*/A = require("./a");
/////*2*/A;

verify.baselineFindAllReferences('0', '1', '2')
