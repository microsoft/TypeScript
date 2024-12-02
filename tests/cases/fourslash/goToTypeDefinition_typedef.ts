/// <reference path='fourslash.ts' />

// @allowJs: true

// @Filename: /a.js
/////**
//// * /*def*/@typedef {object} I
//// * @property {number} x
//// */
////
/////** @typedef {{ name: string }} Foo */

/////** @type {I} */
////const /*a*/a = { x: 0 };
////
////const b = /** @type {/*b*/Foo} */({});
////const c = /** @type {/*c*/Foo} */({}).name;
////const d = /** @type {/*d*/Foo} */({})['name'];

verify.baselineGoToType("a", "b", "c", "d");
