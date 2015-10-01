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
let itemsFromType = ["toExponential"];
let identifiersFromCurrentFile = ["fractionDigits", "Number", "x"].sort((a, b) => a.localeCompare(b));
verify.verifyCompletionListStartsWithItemsInOrder(itemsFromType.concat(identifiersFromCurrentFile));
