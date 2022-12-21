/// <reference path='fourslash.ts' />

// @Filename: /a.ts
////type /*0*/T = number;
/////*1*/export = /*2*/T;

// @Filename: /b.ts
////import /*3*/T = require("/*4*/./a");

verify.baselineFindAllReferences('0', '1', '2', '3', '4')
