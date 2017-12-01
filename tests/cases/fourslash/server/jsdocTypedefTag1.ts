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

goTo.marker('1');
verify.completionListContains('charAt');