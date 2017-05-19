///<reference path="fourslash.ts" />

// @allowNonTsExtensions: true
// @Filename: Foo.js
//// /**
////  * @template T
////  * @param {T} a
////  * @return {T} */
//// function foo(a) { }
//// let x = /*1*/foo;
//// foo(1)./**/

goTo.marker('1');
goTo.marker();
verify.completionListContains("toExponential", /*displayText:*/ undefined, /*documentation*/ undefined, "method");
