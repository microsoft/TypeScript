/// <reference path="../fourslash.ts"/>

// @lib: es5
// @allowNonTsExtensions: true
// @Filename: jsDocTypedef_form2.js
////
//// /** [|@typedef {(string | number)} [|{| "contextRangeIndex": 0 |}NumberLike|]|] */
////
//// /** @type {[|NumberLike|]} */
//// var numberLike;

const [rDef, ...ranges] = test.ranges();
verify.baselineRename(ranges, { findInComments: true });
