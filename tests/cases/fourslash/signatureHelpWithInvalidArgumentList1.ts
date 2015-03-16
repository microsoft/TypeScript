/// <reference path='fourslash.ts' />

////function foo(a) { }
////foo(hello my name /**/is

goTo.marker();
verify.signatureHelpPresent();
verify.signatureHelpCountIs(1);

