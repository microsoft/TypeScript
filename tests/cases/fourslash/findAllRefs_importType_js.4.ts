/// <reference path="fourslash.ts" />

// @module: commonjs
// @allowJs: true
// @checkJs: true

// @Filename: /a.js
/////**
//// * @callback /**/A
//// * @param {unknown} response
//// */
////
////module.exports = {};

// @Filename: /b.js
/////** @typedef {import("./a").A} A */

verify.baselineFindAllReferences("");
