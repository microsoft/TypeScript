/// <reference path='fourslash.ts' />

//// function f(templateStrings, x, y, z) { return 10; }
//// function g(templateStrings, x, y, z) { return ""; }
//// 
//// f `   ${  123 } /*1*/${  }   /*2*/\/*3*/
//// /*4*/\\/*5*/
//// /*6*/\\\/*7*/
//// /*8*/

test.markers().forEach(m => {
    goTo.position(m.position);

    verify.signatureHelpCountIs(1);
    verify.signatureHelpArgumentCountIs(1);

    verify.currentSignatureParameterCountIs(4);
    verify.currentSignatureHelpIs('f(templateStrings: any, x: any, y: any, z: any): number');
    verify.currentParameterHelpArgumentNameIs("templateStrings");
    verify.currentParameterSpanIs("templateStrings: any");
});