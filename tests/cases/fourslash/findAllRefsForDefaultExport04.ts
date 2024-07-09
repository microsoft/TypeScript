/// <reference path='fourslash.ts' />

// @Filename: /a.ts
////const /*0*/a = 0;
////export /*1*/default /*2*/a;

// @Filename: /b.ts
////import /*3*/a from "./a";
/////*4*/a;

verify.baselineFindAllReferences('0', '2', '1', '3', '4')
