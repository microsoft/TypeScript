/// <reference path="../fourslash.ts" />

// @allowNonTsExtensions: true
// @Filename: file1.js
/////// <reference no-default-lib="true"/>
////interface Number {
////    toExponential(fractionDigits?: number): string;
////}
////var x = 1;
////x./*1*/

goTo.marker("1");
verify.verifyCompletionListStartsWithItemsInOrder(["toExponential", "fractionDigits", "Number", "x"]); // first - members from type then identifiers from the current file
