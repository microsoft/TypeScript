/// <reference path="../fourslash.ts"/>

// @lib: es2015
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
