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

//// /**
////  * @param {MyType} my2
////  */
//// function b(my2) {
////     my2.yes./*2*/
//// }

verify.completions(
    { marker: "1", includes: "charAt" },
    { marker: "2", excludes: "charAt" },
);
