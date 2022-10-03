/// <reference path='fourslash.ts' />
// @Filename: m.ts
////export var /*1*/x = 12;
// @Filename: main.ts
////import { /*2*/x } from "./m";
////const y = x;

verify.baselineFindAllReferences('1', '2')
