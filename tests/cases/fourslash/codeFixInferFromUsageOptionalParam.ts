/// <reference path='fourslash.ts' />

// @noImplicitAny: true
////function f([|a? |]){
////    a;
////}
////f();
////f(1);

verify.rangeAfterCodeFix("a?: number");