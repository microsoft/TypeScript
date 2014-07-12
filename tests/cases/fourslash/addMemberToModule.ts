/// <reference path="fourslash.ts" />

////module A {
////    /*var*/
////}
////module A/*check*/ {
////    var p;
////}

diagnostics.setEditValidation(IncrementalEditValidation.SyntacticOnly);

goTo.marker('check');
verify.quickInfoExists();

goTo.marker('var');
edit.insert('var o;');

goTo.marker('check');
verify.quickInfoExists();

