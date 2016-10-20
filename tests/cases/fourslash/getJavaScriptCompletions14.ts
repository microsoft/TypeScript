/// <reference path="fourslash.ts" />

// @allowNonTsExtensions: true
// @Filename: file1.js
/////// <reference no-default-lib="true"/>
////interface Number {
////    toExponential(fractionDigits?: number): string;
////}
////var x = 1;
////x./*1*/

goTo.marker("1");
verify.completionListContains("toExponential", /*displayText:*/ undefined, /*documentation*/ undefined, "method");
