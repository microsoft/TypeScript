/// <reference path='fourslash.ts' />

//// function foo(strs, ...rest) {
//// }
//// 
//// /*1*/fo/*2*/o /*3*/`abcd`/*4*/

test.markers().forEach(m => {
    goTo.position(m.position);
    verify.not.signatureHelpPresent();
});