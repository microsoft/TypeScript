/// <reference path='fourslash.ts' />

////var objectLiteral = { n: 5, s: "", f: (a: number, b: string) => "" };
////objectLiteral.f(/*objectLiteral1*/4, /*objectLiteral2*/"");

goTo.marker('objectLiteral1');
verify.signatureHelpCountIs(1);
verify.currentSignatureParameterCountIs(2);
verify.currentSignatureHelpIs('f(a: number, b: string): string');

verify.currentParameterHelpArgumentNameIs("a");
verify.currentParameterSpanIs("a: number");

goTo.marker('objectLiteral2');
verify.currentSignatureHelpIs('f(a: number, b: string): string');
verify.currentParameterHelpArgumentNameIs("b");
verify.currentParameterSpanIs("b: string");