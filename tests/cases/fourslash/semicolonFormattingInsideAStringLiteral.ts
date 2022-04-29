/// <reference path='fourslash.ts' />

////    var x = "string/**/


goTo.marker();
edit.insert(';');
// Semicolon Formating should not be triggered inside an unterminated string literal
verify.currentLineContentIs('   var x = "string;');

