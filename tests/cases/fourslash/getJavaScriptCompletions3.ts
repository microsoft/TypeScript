///<reference path="fourslash.ts" />

// @allowNonTsExtensions: true
// @Filename: Foo.js
/////** @type {Array.<number>} */
////var v;
////v./**/

goTo.marker();
verify.completionListContains("concat", /*displayText:*/ undefined, /*documentation*/ undefined, "method");