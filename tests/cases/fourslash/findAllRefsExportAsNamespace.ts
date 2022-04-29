/// <reference path='fourslash.ts' />

// `export as namespace` results in global search.

// @Filename: /node_modules/a/index.d.ts
////export function /*0*/f(): void;
////export as namespace A;

// @Filename: /b.ts
////import { /*1*/f } from "a";

// @Filename: /c.ts
////A./*2*/f();

verify.noErrors();

verify.baselineFindAllReferences('0', '1', '2')
