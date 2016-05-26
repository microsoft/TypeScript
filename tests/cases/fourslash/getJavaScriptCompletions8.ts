///<reference path="fourslash.ts" />

// @allowNonTsExtensions: true
// @Filename: Foo.js
/////**
//// * @type {function(): number}
//// */
////var v;
////v()./**/

goTo.marker();
verify.completionListContains("toExponential", /*displayText:*/ undefined, /*documentation*/ undefined, "method");