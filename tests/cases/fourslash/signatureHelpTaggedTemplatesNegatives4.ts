/// <reference path='fourslash.ts' />

//// function foo(strs, ...rest) {
//// }
////
//// /*1*/fo/*2*/o /*3*/``/*4*/  /*5*/

verify.noSignatureHelp(...test.markerNames());
