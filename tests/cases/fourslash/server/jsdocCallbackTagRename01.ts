/// <reference path="../fourslash.ts"/>

// @allowNonTsExtensions: true
// @Filename: jsDocCallback.js
////
//// /**
////  * @callback [|FooCallback|]
////  * @param {string} eventName - Rename should work
////  */
////
//// /** @type {/*1*/[|FooCallback|]} */
//// var t;

const ranges = test.ranges();
verify.renameLocations(ranges[0], { findInStrings: false, findInComments: true, ranges });
