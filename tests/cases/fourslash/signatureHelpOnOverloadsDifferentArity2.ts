/// <reference path='fourslash.ts'/>

////declare function f(s: string);
////declare function f(n: number);
////declare function f(s: string, b: boolean);
////declare function f(n: number, b: boolean);
////
////f(1/**/ var

goTo.marker();
verify.signatureHelpCountIs(4);
verify.currentSignatureHelpIs("f(n: number): any");
verify.currentParameterHelpArgumentNameIs("n");
verify.currentParameterSpanIs("n: number");

edit.insert(", ");
verify.signatureHelpCountIs(4);
verify.currentSignatureHelpIs("f(n: number, b: boolean): any");
verify.currentParameterHelpArgumentNameIs("b");
verify.currentParameterSpanIs("b: boolean");