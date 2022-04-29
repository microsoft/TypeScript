/// <reference path='fourslash.ts' />

//// class C1 {
////     f1() {}
//// }
////
//// class C2 extends C1 {
////
//// }
////
//// declare class C3 implements C2 {[|
////     |]f2();
//// }

verify.rangeAfterCodeFix(`f1(): void;
`);
