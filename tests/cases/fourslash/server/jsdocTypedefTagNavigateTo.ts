/// <reference path="../fourslash.ts"/>

// @allowNonTsExtensions: true
// @Filename: jsDocTypedef_form2.js
////
//// /** @typedef {(string | number)} NumberLike */
//// /** @typedef {(string | number | string[])} */
//// var NumberLike2;
////
//// /** @type {/*1*/NumberLike} */
//// var numberLike;

verify.navigationBarContains("NumberLike", "type");
verify.navigationBarContains("NumberLike2", "type");
verify.navigationBarContains("NumberLike2", "var");
verify.navigationBarContains("numberLike", "var");