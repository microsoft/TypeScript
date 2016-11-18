/// <reference path='fourslash.ts' />

////if (100) {
////}
////else if (200) {
////}/*1*/
////else if (300) {
////}

goTo.marker("1");
edit.insert("\n");
verify.indentationIs(0);
