/// <reference path="fourslash.ts" />

// @allowJs: true
// @checkJs: true

// @filename: a.js
/////**
//// * @typedef Foo
//// * @property {number} a
//// * @property {string} b
//// */
////
/////**
//// * @param {Foo} options
//// */
////function f({ /**/ }) {}

verify.completions({ marker: "", exact: ["a", "b"] });
