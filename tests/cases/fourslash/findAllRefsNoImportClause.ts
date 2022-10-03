/// <reference path="fourslash.ts" />

// https://github.com/Microsoft/TypeScript/issues/15452

// @Filename: /a.ts
/////*1*/export const /*2*/x = 0;

// @Filename: /b.ts
////import "./a";

verify.baselineFindAllReferences('1', '2');
