/// <reference path="../fourslash.ts"/>

// @allowNonTsExtensions: true
// @Filename: jsdocCompletion_typedef.js

//// /**
////  * @typedef {string | number} T.NumberLike
////  * @typedef {{age: number}} T.People
////  * @typedef {string | number} T.O.Q.NumberLike
////  * @type {T.NumberLike}
////  */
//// var x; x./*1*/;
//// /** @type {T.O.Q.NumberLike} */
//// var x1; x1./*2*/;
//// /** @type {T.People} */
//// var x1; x1./*3*/;

goTo.marker("1");
verify.memberListContains('charAt');
verify.memberListContains('toExponential');

goTo.marker("2");
verify.memberListContains('age');

goTo.marker("3");
verify.memberListContains('charAt');
verify.memberListContains('toExponential');