/// <reference path='fourslash.ts' />

//// function f(templateStrings, x, y, z) { return 10; }
//// function g(templateStrings, x, y, z) { return ""; }
//// 
//// f `   ${      } ${/*1*/  /*2*/

test.markers().forEach(m => {
    goTo.position(m.position);
    verify.signatureHelpCountIs(1);
    verify.currentSignatureParamterCountIs(4);
    verify.currentSignatureHelpIs('f(templateStrings: any, x: any, y: any, z: any): number');
    verify.currentParameterHelpArgumentNameIs("y");
    verify.currentParameterSpanIs("y: any");
});