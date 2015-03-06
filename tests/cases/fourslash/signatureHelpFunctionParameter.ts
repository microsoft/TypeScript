/// <reference path='fourslash.ts' />

////function parameterFunction(callback: (a: number, b: string) => void) {
////    callback(/*parameterFunction1*/5, /*parameterFunction2*/"");
////}

goTo.marker('parameterFunction1');
verify.signatureHelpCountIs(1);
verify.currentSignatureParameterCountIs(2);
verify.currentSignatureHelpIs('callback(a: number, b: string): void');
verify.currentParameterHelpArgumentNameIs("a");
verify.currentParameterSpanIs("a: number");

goTo.marker('parameterFunction2');
verify.currentSignatureHelpIs('callback(a: number, b: string): void');
verify.currentParameterHelpArgumentNameIs("b");
verify.currentParameterSpanIs("b: string");