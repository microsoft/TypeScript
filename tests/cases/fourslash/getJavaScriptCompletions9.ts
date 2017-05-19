///<reference path="fourslash.ts" />

// @allowNonTsExtensions: true
// @Filename: Foo.js
/////**
//// * @type {function(new:number)}
//// */
////var v;
////new v()./**/

goTo.marker();
verify.completionListContains("toExponential", /*displayText:*/ undefined, /*documentation*/ undefined, "method");