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
`type E = number`,
"Doc");
verify.quickInfoAt("value",
`const E: {
    A: number;
}`,
"Doc");
