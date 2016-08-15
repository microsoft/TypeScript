/// <reference path="../fourslash.ts"/>

// @allowNonTsExtensions: true
// @Filename: jsDocTypedef_form2.js
////
//// /** @typedef {(string | number)} /*1*/[|NumberLike|] */
////
//// /** @type {/*2*/[|NumberLike|]} */
//// var numberLike;

goTo.file('jsDocTypedef_form2.js')
goTo.marker('1');
verify.renameLocations(/*findInStrings*/ false, /*findInComments*/ true);
goTo.marker('2');
verify.renameLocations(/*findInStrings*/ false, /*findInComments*/ true);