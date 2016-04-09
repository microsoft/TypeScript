/// <reference path="../fourslash.ts"/>

// @allowNonTsExtensions: true
// @Filename: jsDocTypedef_form1.js
////
//// /** @typedef {(string | number)} */
//// var /*1*/[|NumberLike|];
////
//// /*2*/[|NumberLike|] = 10;
////
//// /** @type {/*3*/[|NumberLike|]} */
//// var numberLike;

goTo.file('jsDocTypedef_form1.js')
goTo.marker('1');
verify.renameLocations(/*findInStrings*/ false, /*findInComments*/ true);
goTo.marker('2');
verify.renameLocations(/*findInStrings*/ false, /*findInComments*/ true);
goTo.marker('3');
verify.renameLocations(/*findInStrings*/ false, /*findInComments*/ true);