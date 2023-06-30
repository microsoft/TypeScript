/// <reference path='fourslash.ts' />

// @Filename: /a.ts
/////*1*/export type /*2*/T = number;
/////*3*/export type /*4*/U = string;

// @Filename: /b.ts
////const x: import("./a")./*5*/T = 0;
////const x: import("./a")./*6*/U = 0;

verify.baselineFindAllReferences('1', '2', '3', '4', '5', '6');
