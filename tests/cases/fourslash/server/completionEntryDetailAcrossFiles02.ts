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

verify.completions(
    { marker: "1", includes: { name: "foo", text: "var foo: (p1: string) => void", documentation: "Modify the parameter", tags: [{ name: "param", text: "p1" }] } },
    { marker: "2", exact: { name: "foo", text: "(property) a.foo: (p1: string) => void", documentation: "Modify the parameter", tags: [{ name: "param", text: "p1" }] } },
);
