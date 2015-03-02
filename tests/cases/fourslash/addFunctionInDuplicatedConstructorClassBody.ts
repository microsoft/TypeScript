/// <reference path="fourslash.ts" />

//// class Foo {
////     constructor() { }
////     constructor() { }
////     /**/
//// }

goTo.marker();
var func = 'fn() { }';
edit.insert(func);
verify.numberOfErrorsInCurrentFile(2);
