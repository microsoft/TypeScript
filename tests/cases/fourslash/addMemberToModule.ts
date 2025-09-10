/// <reference path="fourslash.ts" />

////namespace A {
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

