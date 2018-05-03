/// <reference path='fourslash.ts' />

// @allowJs: true

// @Filename: /a.js
/////**
//// * @typedef I {Object}
//// * @prop [|p|] {number}
//// */
////
/////** @type {I} */
////let x;
////x.[|p|];

verify.rangesReferenceEachOther();
