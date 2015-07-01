/// <reference path='fourslash.ts' />

////class ImplicitConstructor {
////}
////var implicitConstructor = new ImplicitConstructor(/**/);

goTo.marker();
verify.signatureHelpCountIs(1);
verify.currentSignatureHelpIs("ImplicitConstructor(): ImplicitConstructor");
verify.currentSignatureParameterCountIs(0);
