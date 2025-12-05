/// <reference path="fourslash.ts" />

// @allowNonTsExtensions: true
// @Filename: file1.js
////interface Number {
////    toExponential(fractionDigits?: number): string;
////}
////var x = 1;
////x./*1*/

verify.completions({ marker: "1", includes: { name: "toExponential", kind: "method", kindModifiers: "declare" } });
