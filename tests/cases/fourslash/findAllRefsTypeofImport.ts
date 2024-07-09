/// <reference path='fourslash.ts' />

// @Filename: /a.ts
/////*1*/export const /*2*/x = 0;
////declare const a: typeof import("./a");
////a./*3*/x;

verify.baselineFindAllReferences('1', '2', '3');
