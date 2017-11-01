/// <reference path='fourslash.ts' />

// @noImplicitAny: true
////class C {
////    [|p;|]
////    method() {
////        this.p.push(10);
////    }
////}

verify.rangeAfterCodeFix("p: number[];");