/// <reference path='fourslash.ts' />

// @noImplicitAny: true
////function wrap( [| arr |] ) {
////     arr.sort(function (a: number, b: number) { return a < b ? -1 : 1 })
//// }

// https://github.com/Microsoft/TypeScript/issues/29330
verify.rangeAfterCodeFix("arr: { sort: (arg0: (a: number, b: number) => 1 | -1) => void; }");
