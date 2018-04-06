/// <reference path='fourslash.ts' />

// @Filename: f1.ts
////export const fooooooooo = 1;

// @Filename: f2.ts
////import {[|fooooooooa|]} from "./f1"; fooooooooa;

goTo.file("f2.ts")
verify.rangeAfterCodeFix(`fooooooooo`);