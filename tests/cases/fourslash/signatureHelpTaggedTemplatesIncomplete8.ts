/// <reference path='fourslash.ts' />

//// function f(templateStrings, x, y, z) { return 10; }
//// function g(templateStrings, x, y, z) { return ""; }
////
//// f `/*1*/\/*2*/`/*3*/ /*4*/

goTo.eachMarker(() => {
    verify.signatureHelpCountIs(1);
    verify.signatureHelpArgumentCountIs(1);

    verify.currentSignatureParameterCountIs(4);
    verify.currentSignatureHelpIs('f(templateStrings: any, x: any, y: any, z: any): number');
    verify.currentParameterHelpArgumentNameIs("templateStrings");
    verify.currentParameterSpanIs("templateStrings: any");
});