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

verify.quickInfoAt("", "(property) I.x: number", "Doc\nMore doc");
