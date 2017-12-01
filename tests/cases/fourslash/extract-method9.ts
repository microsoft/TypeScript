/// <reference path='fourslash.ts' />

//// function f() {
////     /*a*/function q() { }
////     q();/*b*/
////     q();
//// }

goTo.select('a', 'b');
verify.not.refactorAvailable("Extract Symbol");

