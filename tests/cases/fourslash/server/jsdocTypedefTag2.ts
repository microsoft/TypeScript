/// <reference path="../fourslash.ts"/>

// @allowNonTsExtensions: true
// @Filename: jsdocCompletion_typedef.js

//// /**
////  * @typedef {Object} A.B.MyType
////  * @property {string} yes
////  */
//// function foo() {}

//// /**
////  * @param {A.B.MyType} my2
////  */
//// function a(my2) {
////     my2.yes./*1*/
//// }

verify.completions(
    { marker: "1", includes: "charAt" }
);
