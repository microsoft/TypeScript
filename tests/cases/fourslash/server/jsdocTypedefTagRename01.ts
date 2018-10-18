/// <reference path="../fourslash.ts"/>

// @allowNonTsExtensions: true
// @Filename: jsDocTypedef_form1.js
////
//// /** @typedef {(string | number)} */
//// var [|NumberLike|];
////
//// [|NumberLike|] = 10;
////
//// /** @type {[|NumberLike|]} */
//// var numberLike;

verify.rangesAreRenameLocations({ findInComments: true });
