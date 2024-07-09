/// <reference path="fourslash.ts" />

////module A {
////    /*var*/
////}
////module /*check*/A {
////    var p;
////}

goTo.marker('check');
verify.quickInfoExists();

goTo.marker('var');
edit.insert('var o;');

goTo.marker('check');
verify.quickInfoExists();

