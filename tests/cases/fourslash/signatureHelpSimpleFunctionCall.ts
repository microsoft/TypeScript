/// <reference path='fourslash.ts' />

////// Simple function test
////function functionCall(str: string, num: number) {
////}
////functionCall(/*functionCall1*/);
////functionCall("", /*functionCall2*/1);


goTo.marker('functionCall1');
verify.signatureHelpCountIs(1);
verify.currentSignatureHelpIs("functionCall(str: string, num: number): void");
verify.currentParameterHelpArgumentNameIs("str");
verify.currentParameterSpanIs("str: string");
goTo.marker('functionCall2');
verify.currentSignatureHelpIs("functionCall(str: string, num: number): void");
verify.currentParameterHelpArgumentNameIs("num");
verify.currentParameterSpanIs("num: number");

