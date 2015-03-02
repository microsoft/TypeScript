/// <reference path='fourslash.ts' />

////foo({
////}, {/*1*/
////});/*2*/

format.document();
goTo.marker("1");
verify.currentLineContentIs("}, {");
goTo.marker("2");
verify.currentLineContentIs("    });");