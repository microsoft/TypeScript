/// <reference path='fourslash.ts' />

// @lib: es2017

//// /** interface prefix */
//// interface /**interface name prefix */ I /**open-brace prefix*/{
////     /** property prefix*/ x /**colon prefix*/: /**number prefix*/ number;
////
//// /**close-brace prefix*/ }
//// class C implements I {[| |]}

verify.rangeAfterCodeFix(`
    x: number;
`);
