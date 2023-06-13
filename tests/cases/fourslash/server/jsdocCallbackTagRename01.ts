/// <reference path="../fourslash.ts"/>

// @allowNonTsExtensions: true
// @Filename: jsDocCallback.js
////
//// /**
////  * [|@callback [|{| "contextRangeIndex": 0 |}FooCallback|]
////  * @param {string} eventName - Rename should work
////  |]*/
////
//// /** @type {/*1*/[|FooCallback|]} */
//// var t;

const [rDef, ...ranges] = test.ranges();
verify.baselineRename(ranges[0], { findInStrings: false, findInComments: true });
