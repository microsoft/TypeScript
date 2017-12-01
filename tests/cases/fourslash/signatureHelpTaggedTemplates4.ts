/// <reference path='fourslash.ts' />

//// function f(templateStrings, x, y, z) { return 10; }
//// function g(templateStrings, x, y, z) { return ""; }
////
//// f ` qwerty ${ 123 } asdf ${/*1*/  /*2*/ /*3*/41/*4*/234/*5*/   /*6*/}  zxcvb ${ g `    ` }    `

goTo.eachMarker(() => {
    verify.signatureHelpCountIs(1);
    verify.signatureHelpArgumentCountIs(4);

    verify.currentSignatureParameterCountIs(4);
    verify.currentSignatureHelpIs('f(templateStrings: any, x: any, y: any, z: any): number');
    verify.currentParameterHelpArgumentNameIs("y");
    verify.currentParameterSpanIs("y: any");
});