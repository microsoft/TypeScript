///<reference path="fourslash.ts" />

// @allowNonTsExtensions: true
// @Filename: Foo.js
/////** @return {number} */
////function foo(a,b) { }
////foo(1,2)./**/

goTo.marker();
verify.completionListContains("toExponential", /*displayText:*/ undefined, /*documentation*/ undefined, "method");