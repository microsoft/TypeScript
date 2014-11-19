/// <reference path='fourslash.ts' />

//// function f(templateStrings, x, y, z) { return 10; }
//// function g(templateStrings, x, y, z) { return ""; }
//// 
//// f ` qwerty ${ 123 } asdf ${   41234   }  zxcvb ${/*1*/ /*2*/g/*3*/ /*4*/`    `/*5*/ /*6*/}    `

test.markers().forEach(m => {
    goTo.position(m.position);

    verify.signatureHelpCountIs(1);
    verify.signatureHelpArgumentCountIs(4);

    verify.currentSignatureParamterCountIs(4);
    verify.currentSignatureHelpIs('f(templateStrings: any, x: any, y: any, z: any): number');
    verify.currentParameterHelpArgumentNameIs("z");
    verify.currentParameterSpanIs("z: any");
});