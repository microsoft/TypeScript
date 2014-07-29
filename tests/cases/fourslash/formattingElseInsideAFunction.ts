/// <reference path='fourslash.ts' />

////var x = function() {
////    if (true) {
////    /*1*/} else {/*2*/
////}
////
////// newline at the end of the file

goTo.marker("2");
edit.insertLine("");
goTo.marker("1");
// else formating should not be affected
verify.currentLineContentIs('    } else {');
