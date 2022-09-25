/// <reference path='fourslash.ts' />

// @Filename: /a.ts
////export /*1*/default 1;

// @Filename: /b.ts
////import a from "./a";

verify.baselineFindAllReferences('1')
