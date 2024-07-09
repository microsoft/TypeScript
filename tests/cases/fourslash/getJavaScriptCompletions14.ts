/// <reference path="fourslash.ts" />

// @allowNonTsExtensions: true
// @Filename: file1.js
/////// <reference no-default-lib="true"/>
////interface Number {
////    toExponential(fractionDigits?: number): string;
////}
////var x = 1;
////x./*1*/

verify.completions({ marker: "1", includes: { name: "toExponential", kind: "method" } });
