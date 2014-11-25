/// <reference path='fourslash.ts' />

////function Foo(arg1: string, arg2: string) {
////}
////
////Foo(/*1*/);
////function Bar<T>(arg1: string, arg2: string) { }
////Bar</*2*/>();

goTo.marker('1');
verify.signatureHelpPresent();
verify.signatureHelpCountIs(1);

verify.currentSignatureHelpIs("Foo(arg1: string, arg2: string): void");
verify.currentSignatureParameterCountIs(2);
verify.currentParameterHelpArgumentNameIs("arg1");
verify.currentParameterSpanIs("arg1: string");

goTo.marker('2');
verify.signatureHelpPresent();