/// <reference path='fourslash.ts' />

//// abstract class A {
////     abstract x: number;
//// }
////
//// class C implements A {[| |]}

verify.rangeAfterCodeFix(`
x: number;
`);