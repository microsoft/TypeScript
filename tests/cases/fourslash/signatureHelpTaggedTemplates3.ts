/// <reference path='fourslash.ts' />

//// function f(templateStrings, x, y, z) { return 10; }
//// function g(templateStrings, x, y, z) { return ""; }
////
//// f ` qwerty ${/*1*/ /*2*/123/*3*/ /*4*/} asdf ${   41234   }  zxcvb ${ g `    ` }    `

goTo.eachMarker(() => {
    verify.signatureHelpCountIs(1);
    verify.signatureHelpArgumentCountIs(4);

    verify.currentSignatureParameterCountIs(4);
    verify.currentSignatureHelpIs('f(templateStrings: any, x: any, y: any, z: any): number');
    verify.currentParameterHelpArgumentNameIs("x");
    verify.currentParameterSpanIs("x: any");
});