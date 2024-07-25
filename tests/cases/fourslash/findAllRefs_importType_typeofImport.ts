/// <reference path='fourslash.ts' />

// @Filename: /a.ts
////export const x = 0;

// @Filename: /b.ts
/////*1*/const x: typeof import("/*2*/./a") = { x: 0 };
/////*3*/const y: typeof import("/*4*/./a") = { x: 0 };

verify.baselineFindAllReferences('1', '2', '3', '4');
