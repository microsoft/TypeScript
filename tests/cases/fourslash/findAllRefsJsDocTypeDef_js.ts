/// <reference path='fourslash.ts'/>

// Tests that the scope of @typedef is not just the node immediately below it.

// @allowJs: true

// @Filename: /a.js
/////** /*1*/@typedef {number} /*2*/T */
////
/////**
//// * @return {/*3*/T}
//// */
////function f(obj) { return 0; }
////
/////**
//// * @return {/*4*/T}
//// */
////function f2(obj) { return 0; }

verify.baselineFindAllReferences('1', '2', '3', '4');
