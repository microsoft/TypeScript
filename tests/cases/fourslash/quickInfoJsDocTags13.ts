/// <reference path="fourslash.ts" />

// @allowJs: true
// @checkJs: true
// @filename: ./a.js
/////**
//// * First overload
//// * @overload
//// * @param {number} a
//// * @returns {void}
//// */
////
/////**
//// * Second overload
//// * @overload
//// * @param {string} a
//// * @returns {void}
//// */
////
/////**
//// * @param {string | number} a
//// * @returns {void}
//// */
////function f(a) {}
////
////f(/*a*/1);
////f(/*b*/"");

verify.baselineSignatureHelp();
