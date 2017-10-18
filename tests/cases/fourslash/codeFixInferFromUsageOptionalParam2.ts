/// <reference path='fourslash.ts' />

// @noImplicitAny: true
////function f([|a? |]){
////    if (a < 9) return;
////}

verify.rangeAfterCodeFix("a?: number");