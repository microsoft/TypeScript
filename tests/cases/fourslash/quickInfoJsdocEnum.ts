/// <reference path="./fourslash.ts"/>

// @allowJs: true
// @noLib: true

// @Filename: /a.js
/////**
//// * Doc
//// * @enum {number}
//// */
////const E = {
////    A: 0,
////}
////
/////** @type {/*type*/E} */
////const x = /*value*/E.A;

verify.noErrors();

verify.quickInfoAt("type",
`enum E`,
"Doc");
verify.quickInfoAt("value",
`enum E
const E: {
    A: number;
}`,
"Doc");
