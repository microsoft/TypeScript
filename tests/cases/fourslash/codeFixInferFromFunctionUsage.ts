/// <reference path='fourslash.ts' />

// @noImplicitAny: true
////function wrap( [| arr |] ) {
////     arr.other(function (a: number, b: number) { return a < b ? -1 : 1 });
//// }

// https://github.com/Microsoft/TypeScript/issues/29330
verify.rangeAfterCodeFix("arr: { other: (arg0: (a: number, b: number) => 1 | -1) => void; }");
