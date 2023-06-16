/// <reference path='fourslash.ts'/>

// @Filename: file.ts
////export var x = 10;
////export var y = 10;
////export { x as "hello world", x as await };
////export default class C {
////}


// @Filename: a.ts
////import { /*1*/ } from "./file";
////import { x, /*2*/ } from "./file";
////import { x, y, /*3*/ } from "./file";
////import { x, y, "hello world" as d,  /*4*/ } from "./file";
////import { x, y, "hello world" as d, await as await_, /*5*/ } from "./file";

goTo.file("a.ts");
verify.baselineCompletions();
