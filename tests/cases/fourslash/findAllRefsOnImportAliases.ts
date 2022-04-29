/// <reference path="fourslash.ts" />

//@Filename: a.ts
////export class /*0*/Class {
////}

//@Filename: b.ts
////import { /*1*/Class } from "./a";
////
////var c = new /*2*/Class();

//@Filename: c.ts
////export { /*3*/Class } from "./a";

verify.baselineFindAllReferences('0', '1', '2')
