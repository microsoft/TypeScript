/// <reference path='fourslash.ts' />

// @allowJs: true

// @Filename: /a.js
/////**
//// * /*def*/@typedef {object} I
//// * @property {number} x
//// */
////
/////** @type {I} */
////const /*ref*/i = { x: 0 };

verify.baselineGoToType("ref");
