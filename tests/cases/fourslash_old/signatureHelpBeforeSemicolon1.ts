/// <reference path='fourslash.ts' />

////function Foo(arg1: string, arg2: string) {
////}
////
////Foo(/**/;

goTo.marker();
verify.signatureHelpPresent();
verify.signatureHelpCountIs(1);

verify.currentSignatureHelpIs("Foo(arg1: string, arg2: string): void");
verify.currentSignatureParamterCountIs(2);
verify.currentParameterHelpArgumentNameIs("arg1");
verify.currentParameterSpanIs("arg1: string");