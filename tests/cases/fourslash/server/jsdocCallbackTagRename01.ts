/// <reference path="../fourslash.ts"/>

// @allowNonTsExtensions: true
// @Filename: jsDocCallback.js
////
//// /**
////  * @callback [|FooCallback|]
////  * @param {string} eventName
////  */
////
//// /** @type {/*1*/[|FooCallback|]} */
//// var t;

goTo.marker('1');
verify.renameLocations(/*findInStrings*/ false, /*findInComments*/ true);