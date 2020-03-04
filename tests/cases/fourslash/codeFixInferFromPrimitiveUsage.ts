/// <reference path='fourslash.ts' />

// @noImplicitAny: true
//// function wrap( [| s |] ) {
////     return s.length + s.indexOf('hi')
//// }

// https://github.com/Microsoft/TypeScript/issues/29330
verify.rangeAfterCodeFix("s: string | string[]");

