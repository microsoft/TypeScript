/// <reference path='fourslash.ts' />

// @noImplicitAny: true
//// function foo([|a, m |]) {
////     return a + m
//// }

verify.rangeAfterCodeFix("a: any, m: any", /*includeWhiteSpace*/ undefined, /*errorCode*/ undefined, /*index*/0);

