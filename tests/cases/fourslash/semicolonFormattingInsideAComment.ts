/// <reference path='fourslash.ts' />

////    ///**/

goTo.marker();
edit.insert(';');
// Semicolon Formatting should not be triggered inside comments
verify.currentLineContentIs('   //;');

