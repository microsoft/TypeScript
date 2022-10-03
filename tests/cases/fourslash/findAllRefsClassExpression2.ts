/// <reference path='fourslash.ts' />

// @allowJs: true

// @Filename: /a.js
////exports./*0*/A = class {};

// @Filename: /b.js
////import { /*1*/A } from "./a";
/////*2*/A;

verify.baselineFindAllReferences('0', '1', '2')
