/// <reference path='fourslash.ts' />

// @noImplicitAny: true
////[|var foo;|]
////function f() {
////    foo += 2;
////}

verify.rangeAfterCodeFix("var foo: number;",/*includeWhiteSpace*/ undefined, /*errorCode*/ undefined, 0);