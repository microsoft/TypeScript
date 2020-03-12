/// <reference path='fourslash.ts' />

// @noImplicitAny: true
//// function foo([|a, m |]) {
////     a = 'hi'
////     m = 1
//// }

verify.rangeAfterCodeFix("a: string, m: number", /*includeWhiteSpace*/ undefined, /*errorCode*/ undefined, /*index*/0);

