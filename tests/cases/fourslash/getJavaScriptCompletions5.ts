///<reference path="fourslash.ts" />

// @allowNonTsExtensions: true
// @Filename: Foo.js
/////**
//// * @template T
//// * @param {T} a
//// * @return {T} */
////function foo(a) { }
////foo(1)./**/

debugger;
goTo.marker();
verify.completionListContains("toExponential", /*displayText:*/ undefined, /*documentation*/ undefined, "method");