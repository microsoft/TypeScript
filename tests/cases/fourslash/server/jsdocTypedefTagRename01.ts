/// <reference path="../fourslash.ts"/>

// @allowNonTsExtensions: true
// @Filename: jsDocTypedef_form1.js
////
//// /** @typedef {(string | number)} */
//// var [|NumberLike|];
////
//// /** @type {[|NumberLike|]} */
//// var numberLike;

verify.rangesAreRenameLocations({ findInComments: true });
