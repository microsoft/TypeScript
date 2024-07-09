/// <reference path="../fourslash.ts"/>

// @allowNonTsExtensions: true
// @Filename: jsdocCompletion_typedef.js

//// /**
////  * @typedef {Object} MyType
////  * @property {string} yes
////  */
//// function foo() { }

//// /**
////  * @param {MyType} my
////  */
//// function a(my) {
////     my.yes./*1*/
//// }

verify.completions({ marker: "1", includes: "charAt" });
