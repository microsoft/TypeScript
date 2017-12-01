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


goTo.marker('1');
verify.completionListContains('charAt');
goTo.marker('2');
verify.not.completionListContains('charAt');