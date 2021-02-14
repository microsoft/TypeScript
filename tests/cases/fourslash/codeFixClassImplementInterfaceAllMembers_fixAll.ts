/// <reference path='fourslash.ts' />

////interface I {
////    x: number;
////    y?: number;
////}
////class C1 implements I {}
////class C2 implements I {}
////class C3 implements I {}

verify.not.codeFixAllAvailable("fixClassIncorrectlyImplementsInterface_all");
