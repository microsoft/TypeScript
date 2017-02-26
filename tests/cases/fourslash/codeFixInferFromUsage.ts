/// <reference path='fourslash.ts' />

// @noImplicitAny: true
////[|var foo|];
////function f() {
////    foo += 2;
////}

debugger;

verify.rangeAfterCodeFix("var foo: number");