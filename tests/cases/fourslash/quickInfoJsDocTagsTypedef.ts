/// <reference path='fourslash.ts'/>

// @noEmit: true
// @allowJs: true

// @Filename: quickInfoJsDocTagsTypedef.js

/////**
//// * Bar comment
//// * @typedef {Object} /*1*/Bar
//// * @property {string} baz - baz comment
//// * @property {string} qux - qux comment
//// */
////
/////**
//// * foo comment
//// * @param {/*2*/Bar} x - x comment
//// * @returns {Bar}
//// */
////function foo(x) {
////    return x;
////}

verify.baselineQuickInfo();
