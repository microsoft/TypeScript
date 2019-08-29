/// <reference path='fourslash.ts' />

// @noImplicitAny: true
////function wrap( [| s |] ) {
////     return s.length + s.toUpperCase()
//// }

// https://github.com/Microsoft/TypeScript/issues/29330
verify.rangeAfterCodeFix("s: string");
