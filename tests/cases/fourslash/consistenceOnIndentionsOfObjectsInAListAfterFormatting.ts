/// <reference path='fourslash.ts' />

////foo({
////}, {/*1*/
////});/*2*/

format.document();
goTo.marker("1");
verify.currentLineContentIs("}, {");
goTo.marker("2");
// The expected scenario is failing due to bug 663693 - Formatting: If the first object of a list is not indented, the second should not be indented either.
//verify.currentLineContentIs("});");
verify.currentLineContentIs("    });");