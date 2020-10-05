/// <reference path="../fourslash.ts"/>

// @allowNonTsExtensions: true
// @Filename: a.js
//// /**
////  * Modify the parameter
////  * @param {string} p1
////  */
//// var foo = function (p1) { }
//// exports.foo = foo;
//// fo/*1*/

// @Filename: b.ts
//// import a = require("./a");
//// a.fo/*2*/

const entry = (text: string): FourSlashInterface.ExpectedCompletionEntry => ({ name: "foo", text, documentation: "Modify the parameter", tags: [{ name: "param", text: "p1" }] });
verify.completions(
    { marker: "1", includes: entry("var foo: (p1: string) => void") },
    { marker: "2", exact: entry("(alias) var foo: (p1: string) => void\nimport a.foo") },
);
