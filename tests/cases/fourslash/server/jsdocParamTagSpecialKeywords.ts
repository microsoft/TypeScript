/// <reference path="../fourslash.ts"/>

// @lib: es5
// @allowNonTsExtensions: true
// @Filename: test.js
//// /**
////  * @param {string} type
////  */
//// function test(type) {
////     type./**/
//// }

verify.completions({ marker: "", includes: "charAt" });
