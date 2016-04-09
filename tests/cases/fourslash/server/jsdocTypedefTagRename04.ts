/// <reference path="../fourslash.ts"/>

// @allowNonTsExtensions: true
// @Filename: jsDocTypedef_form2.js
////
//// function test1() {
////    /** @typedef {(string | number)} NumberLike */
////
////    /** @type {/*1*/NumberLike} */
////    var numberLike;
//// }
//// function test2() {
////    /** @typedef {(string | number)} NumberLike2 */
////
////    /** @type {NumberLike2} */
////    var n/*2*/umberLike2;
//// }

goTo.marker('2');
verify.quickInfoExists();
goTo.marker('1');
edit.insert('111');
goTo.marker('2');
verify.quickInfoExists();