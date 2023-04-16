/// <reference path='fourslash.ts'/>
//
// @strict: true
//
//// interface A {
////   arr: string[];
//// }
////
//// function test(a?: A): string {
////   return a?.ar/**/r.length ? "A" : "B";
//// }

verify.quickInfoAt("", "(property) A.arr: string[]");
