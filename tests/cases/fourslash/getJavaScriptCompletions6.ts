///<reference path="fourslash.ts" />

// @allowNonTsExtensions: true
// @Filename: Foo.js
/////**
//// * @param {...number} a
//// */
////function foo(a) {
////    a./**/
////}

goTo.marker();
verify.completionListContains("concat", /*displayText:*/ undefined, /*documentation*/ undefined, "method");