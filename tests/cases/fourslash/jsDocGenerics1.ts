///<reference path="fourslash.ts" />

// @allowNonTsExtensions: true
// @Filename: Foo.js
//// /** @type {Array<number>} */
//// var v;
//// v[0]./**/

goTo.marker();
verify.memberListContains("toFixed", /*displayText:*/ undefined, /*documentation*/ undefined, "method");
