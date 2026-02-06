/// <reference path="../fourslash.ts"/>

// @lib: es5
// @allowNonTsExtensions: true
// @Filename: jsDocTypedef_form1.js
////
//// /** @typedef {(string | number)} */
//// [|var [|{| "contextRangeIndex": 0 |}NumberLike|];|]
////
//// [|NumberLike|] = 10;
////
//// /** @type {[|NumberLike|]} */
//// var numberLike;

const [rDef, ...ranges] = test.ranges();
verify.baselineRename(ranges, { findInComments: true });
