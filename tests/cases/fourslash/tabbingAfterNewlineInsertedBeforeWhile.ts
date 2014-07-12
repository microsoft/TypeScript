/// <reference path='fourslash.ts' />

////function foo() {
////    /**/while (true) { }
////}
 
goTo.marker();
edit.insertLine('');
// Enter' should smart indent such that the current line maintains its indentation
verify.currentLineContentIs('    while (true) { }');
