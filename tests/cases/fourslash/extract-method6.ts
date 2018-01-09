/// <reference path='fourslash.ts' />

// Cannot extract globally-declared functions or
// those with non-selected local references

//// /*f1a*/function f() {
////     /*g1a*/function g() { }
////     g();/*g1b*/
////     g();
//// }/*f1b*/

goTo.select('f1a', 'f1b');
verify.not.refactorAvailable('Extract Symbol');
goTo.select('g1a', 'g1b');
verify.not.refactorAvailable('Extract Symbol');

