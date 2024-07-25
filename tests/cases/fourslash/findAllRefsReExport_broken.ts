/// <reference path='fourslash.ts' />

// @Filename: /a.ts
/////*1*/export { /*2*/x };

verify.baselineFindAllReferences('1', '2');
