/// <reference path='fourslash.ts' />

// @noImplicitAny: true
////class C {
////    constructor([|public p)|] { }
////}
////new C("string");

verify.rangeAfterCodeFix("public p: string)");
