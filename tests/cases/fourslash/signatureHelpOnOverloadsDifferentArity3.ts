/// <reference path='fourslash.ts'/>

////declare function f();
////declare function f(s: string);
////declare function f(s: string, b: boolean);
////declare function f(n: number, b: boolean);
////
////f(/**/

goTo.marker();
verify.signatureHelpCountIs(4);
verify.currentSignatureHelpIs("f(): any");
verify.currentSignatureParameterCountIs(0);
verify.signatureHelpArgumentCountIs(0);

edit.insert(", ");
verify.signatureHelpCountIs(4);
verify.currentSignatureHelpIs("f(s: string, b: boolean): any");
verify.currentSignatureParameterCountIs(2);
verify.currentParameterHelpArgumentNameIs("b");
verify.currentParameterSpanIs("b: boolean");

edit.insert(", ");
verify.signatureHelpCountIs(4);
verify.currentSignatureHelpIs("f(s: string, b: boolean): any");
verify.currentSignatureParameterCountIs(2);