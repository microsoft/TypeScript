/// <reference path='fourslash.ts' />

//// function f(templateStrings, x, y, z) { return 10; }
//// function g(templateStrings, x, y, z) { return ""; }
////
//// f `/*1*/ qwe/*2*/rty /*3*/$/*4*/{ 123 }/*5*/ as/*6*/df /*7*/$/*8*/{   41234   }/*9*/  zxc/*10*/vb /*11*/$/*12*/{ g `    ` }/*13*/  /*14*/  /*15*/

goTo.eachMarker(() => {
    verify.signatureHelpCountIs(1);
    verify.signatureHelpArgumentCountIs(4);

    verify.currentSignatureParameterCountIs(4);
    verify.currentSignatureHelpIs('f(templateStrings: any, x: any, y: any, z: any): number');
    verify.currentParameterHelpArgumentNameIs("templateStrings");
    verify.currentParameterSpanIs("templateStrings: any");
});