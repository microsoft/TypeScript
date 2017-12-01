/// <reference path="../fourslash.ts"/>

// @allowNonTsExtensions: true
// @Filename: jsDocTypedef_form2.js
////
//// /** @typedef {(string | number)} [|NumberLike|] */
////
//// /** @type {[|NumberLike|]} */
//// var numberLike;

verify.rangesAreRenameLocations({ findInComments: true });
