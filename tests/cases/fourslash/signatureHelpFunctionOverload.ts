/// <reference path='fourslash.ts' />

////function functionOverload();
////function functionOverload(test: string);
////function functionOverload(test?: string) { }
////functionOverload(/*functionOverload1*/);
////functionOverload(""/*functionOverload2*/);

goTo.marker('functionOverload1');
verify.signatureHelpCountIs(2);
verify.currentSignatureParameterCountIs(0);
verify.currentSignatureHelpIs('functionOverload(): any');

goTo.marker('functionOverload2');
verify.currentSignatureParameterCountIs(1);
verify.currentSignatureHelpIs('functionOverload(test: string): any');
verify.currentParameterHelpArgumentNameIs("test");
verify.currentParameterSpanIs("test: string");