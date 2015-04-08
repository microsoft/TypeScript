/// <reference path="../fourslash.ts"/>

////function foo(data: number) {
////}
////
////function bar {
////    foo(/*1*/)
////}

goTo.marker('1');
verify.signatureHelpPresent();
verify.signatureHelpCountIs(1);
verify.signatureHelpArgumentCountIs(0);

verify.currentSignatureParameterCountIs(1);
verify.currentSignatureHelpDocCommentIs('');