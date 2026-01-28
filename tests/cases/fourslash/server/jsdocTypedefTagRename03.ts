/// <reference path="../fourslash.ts"/>

// @lib: es5
// @allowNonTsExtensions: true
// @Filename: jsDocTypedef_form3.js
////
//// /**
////  * [|@typedef /*1*/[|{| "contextRangeIndex": 0 |}Person|]
////  * @type {Object}
////  * @property {number} age
////  * @property {string} name
////  |]*/
////
//// /** @type {/*2*/[|Person|]} */
//// var person;

goTo.file('jsDocTypedef_form3.js')
verify.baselineRename(test.rangesByText().get("Person"), { findInComments: true });
