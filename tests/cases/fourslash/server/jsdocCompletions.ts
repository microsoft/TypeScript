/// <reference path="../fourslash.ts"/>

// @allowNonTsExtensions: true
// @Filename: jsdocCompletion_typedef.js
//// /**
////  * @typedef {Object} Person
////  * @property {string} personName
////  * @type {Person}
////  */
//// var x1;
//// x1/**/

goTo.marker();
edit.insert('.');
verify.memberListContains('personName');