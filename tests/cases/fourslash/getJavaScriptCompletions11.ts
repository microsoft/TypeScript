///<reference path="fourslash.ts" />

// @allowNonTsExtensions: true
// @Filename: Foo.js
/////** @type {number|string} */
////var v;
////v./**/

goTo.marker();
verify.completionListContains("toExponential", /*displayText:*/ undefined, /*documentation*/ undefined, "method");
verify.completionListContains("charCodeAt", /*displayText:*/ undefined, /*documentation*/ undefined, "method");