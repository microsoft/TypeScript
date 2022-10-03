/// <reference path='fourslash.ts' />

// @Filename: /a.ts
////class C {}
////export const /*0*/D = C;

// @Filename: /b.ts
////import { /*1*/D } from "./a";

verify.baselineFindAllReferences('0', '1')
