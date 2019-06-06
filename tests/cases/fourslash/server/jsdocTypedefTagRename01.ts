/// <reference path="../fourslash.ts"/>

// @allowNonTsExtensions: true
// @Filename: jsDocTypedef_form1.js
////
//// /** @typedef {(string | number)} */
//// [|var [|{| "declarationRangeIndex": 0 |}NumberLike|];|]
////
//// [|NumberLike|] = 10;
////
//// /** @type {[|NumberLike|]} */
//// var numberLike;

const [rDef, ...ranges] = test.ranges();
verify.rangesAreRenameLocations({ findInComments: true, ranges });
