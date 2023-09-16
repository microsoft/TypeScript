/// <reference path='fourslash.ts'/>

// @allowJs: true
// @checkJs: true
// @Filename: foo.js
/////**
//// * @overload
//// * @param {number} x
//// * @returns {number}
//// *
//// * @overload
//// * @param {string} x
//// * @returns {string} 
//// *
//// * @param {unknown} x
//// * @returns {unknown} 
//// */
////function foo(x/**/) {
////  return x;
////}

verify.baselineRename("", {});
