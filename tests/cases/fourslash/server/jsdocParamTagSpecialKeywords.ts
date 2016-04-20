/// <reference path="../fourslash.ts"/>

// @allowNonTsExtensions: true
// @Filename: test.js
//// /**
////  * @param {string} type
////  */
//// function test(type) {
////     type./**/
//// }


goTo.marker();
verify.completionListContains("charAt");