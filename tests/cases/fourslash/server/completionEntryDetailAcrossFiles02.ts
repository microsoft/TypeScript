/// <reference path="../fourslash.ts"/>

// @allowNonTsExtensions: true
// @Filename: a.js
//// /**
////  * Modify the parameter
////  * @param {string} p1
////  */
//// var foo = function (p1) { }
//// module.exports.foo = foo;
//// fo/*1*/

// @Filename: b.ts
//// import a = require("./a");
//// a.fo/*2*/

goTo.marker('1');
verify.completionEntryDetailIs("foo", "var foo: (p1: string) => void", "Modify the parameter");
goTo.marker('2');
verify.completionEntryDetailIs("foo", "(property) a.foo: (p1: string) => void", "Modify the parameter");
