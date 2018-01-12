/// <reference path='fourslash.ts' />

// @allowJs: true

// @Filename: /a.js
/////**
//// * @typedef I
//// * @property {number} x Doc
//// *                      More doc
//// */
////
/////** @type {I} */
////const obj = { /**/x: 10 };

// TODO: GH#21123 There shouldn't be a "    " before "More doc"
verify.quickInfoAt("", "(property) x: number", "Doc\n    More doc");
