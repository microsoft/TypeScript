/// <reference path='fourslash.ts' />


////function foo(n: number): string {
////}
////
////foo(/**/

goTo.marker();
verify.currentSignatureHelpIs("foo(n: number): string");
verify.currentParameterHelpArgumentNameIs("n");
verify.currentParameterSpanIs("n: number");
