/// <reference path="fourslash.ts" />

//// function f1(a: any): a is number {}
//// function f2<T>(a: any): a is T {}
//// function f3(a: any, ...b): a is number {}
//// f1(/*1*/)
//// f2(/*2*/)
//// f3(/*3*/)

goTo.marker("1");
verify.signatureHelpCountIs(1);
verify.currentSignatureHelpIs("f1(a: any): a is number");

goTo.marker("2");
verify.signatureHelpCountIs(1);
verify.currentSignatureHelpIs("f2<T>(a: any): a is T");

goTo.marker("3");
verify.signatureHelpCountIs(1);
verify.currentSignatureHelpIs("f3(a: any, ...b: any[]): a is number");