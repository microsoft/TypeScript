/// <reference path='fourslash.ts' />

//// abstract class C1 {
////     abstract x: number;
//// }
////
//// class C3 implements C2 {[| |]}

verify.rangeAfterCodeFix(`
x: number;
`);