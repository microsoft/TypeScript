/// <reference path='fourslash.ts' />

////if (a === 1 ||
////    /*0*/b === 2 ||/*1*/
////    c === 3) {
////}

goTo.marker("1");
edit.insert("\n");
goTo.marker("0");
verify.currentLineContentIs("    b === 2 ||");