/// <reference path='fourslash.ts' />

// @noLib: true

////interface A {
////    readonly /*0*/x: number | string;
////}
////interface B extends A {
////    readonly /*1*/x: number;
////}
////const a: A = { /*2*/x: 0 };
////const b: B = { /*3*/x: 0 };

verify.baselineFindAllReferences('0', '1', '2', '3')
