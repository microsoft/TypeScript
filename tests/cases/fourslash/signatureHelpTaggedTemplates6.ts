/// <reference path='fourslash.ts' />

//// function f(templateStrings, x, y, z) { return 10; }
//// function g(templateStrings, x, y, z) { return ""; }
//// 
//// f ` qwerty ${ 123 } asdf ${   41234   }  zxcvb ${ g `/*1*/ /*2*/   /*3*/` }    `

test.markers().forEach(m => {
    goTo.position(m.position);

    verify.signatureHelpCountIs(1);
    verify.signatureHelpArgumentCountIs(1);

    verify.currentSignatureParamterCountIs(4);
    verify.currentSignatureHelpIs('g(templateStrings: any, x: any, y: any, z: any): string');
    verify.currentParameterHelpArgumentNameIs("templateStrings");
    verify.currentParameterSpanIs("templateStrings: any");
});