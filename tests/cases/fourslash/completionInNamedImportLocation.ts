/// <reference path='fourslash.ts'/>

// @Filename: file.ts
////export var x = 10;
////export var y = 10;
////export default class C {
////}


// @Filename: a.ts
////import { /*1*/ } from "./file";
////import { x, /*2*/ } from "./file";

goTo.file("a.ts");
goTo.marker('1');
verify.completionListContains("x", "var x: number");
verify.completionListContains("y", "var y: number");
verify.not.completionListContains("C");

goTo.marker('2');
verify.not.completionListContains("x", "var x: number");
verify.completionListContains("y", "var y: number");
verify.not.completionListContains("C");