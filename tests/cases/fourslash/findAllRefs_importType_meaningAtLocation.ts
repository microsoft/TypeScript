/// <reference path='fourslash.ts' />

// @Filename: /a.ts
/////*1*/export type /*2*/T = 0;
/////*3*/export const /*4*/T = 0;

// @Filename: /b.ts
////const x: import("./a")./*5*/T = 0;
////const x: typeof import("./a")./*6*/T = 0;

verify.baselineFindAllReferences('1', '2', '3', '4', '5', '6');
