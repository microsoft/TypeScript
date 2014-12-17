/// <reference path='fourslash.ts' />

////var anonymousFunctionTest = function(n: number, s: string): (a: number, b: string) => string {
////    return null;
////}
////anonymousFunctionTest(5, "")(/*anonymousFunction1*/1, /*anonymousFunction2*/"");

goTo.marker('anonymousFunction1');
verify.signatureHelpCountIs(1);
verify.currentSignatureParameterCountIs(2);
verify.currentSignatureHelpIs('(a: number, b: string): string');
verify.currentParameterHelpArgumentNameIs("a");
verify.currentParameterSpanIs("a: number");

goTo.marker('anonymousFunction2');
verify.currentParameterHelpArgumentNameIs("b");
verify.currentParameterSpanIs("b: string");
