/// <reference path='fourslash.ts' />

////class foo    {
////    /**/

goTo.marker();
edit.insert('}');
goTo.bof();
verify.currentLineContentIs('class foo {');
