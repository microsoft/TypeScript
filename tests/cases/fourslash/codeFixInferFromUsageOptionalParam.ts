/// <reference path='fourslash.ts' />

// @noImplicitAny: true
////function f([|a? |]){
////}
////f();
////f(1);

verify.rangeAfterCodeFix("a?: number");