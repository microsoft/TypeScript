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
/////** @type {/**/E} */
////const x = E.A;

verify.noErrors();

verify.quickInfoAt("",
`enum E
const E: {
    A: number;
}`,
"Doc");
