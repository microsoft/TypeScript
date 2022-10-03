/// <reference path='fourslash.ts' />

////    ///**/

goTo.marker();
edit.insert(';');
// Semicolon Formating should not be triggered inside comments
verify.currentLineContentIs('   //;');

