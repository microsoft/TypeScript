/// <reference path='fourslash.ts'/>

// @filename: a.ts
////export function /*1*/f() {}

// @filename: b.ts
////import { /*2*/f } from "./a";

verify.baselineFindAllReferences('1', '2');
