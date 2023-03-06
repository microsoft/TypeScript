/// <reference path='fourslash.ts' />

// @Filename: /a.ts
////export = class /*0*/A {
////    m() { /*1*/A; }
////};

// @Filename: /b.ts
////import /*2*/A = require("./a");
/////*3*/A;

verify.baselineFindAllReferences('0', '1', '2', '3')
