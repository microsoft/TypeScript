/// <reference path='fourslash.ts' />

// @allowJs: true

// @Filename: /a.js
/////**
//// * @typedef I {Object}
//// * @prop [|{| "isDefinition": true |}p|] {number}
//// */
////
/////** @type {I} */
////let x;
////x.[|p|];

verify.singleReferenceGroup("(property) p: number");
