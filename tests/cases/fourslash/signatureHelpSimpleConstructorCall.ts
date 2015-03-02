/// <reference path='fourslash.ts' />

////class ConstructorCall { 
////    constructor(str: string, num: number) {
////    }
////}
////var x = new ConstructorCall(/*constructorCall1*/1,/*constructorCall2*/2);

goTo.marker('constructorCall1');
verify.signatureHelpCountIs(1);
verify.currentSignatureHelpIs("ConstructorCall(str: string, num: number): ConstructorCall");
verify.currentParameterHelpArgumentNameIs("str");
verify.currentParameterSpanIs("str: string");
goTo.marker('constructorCall2');
verify.currentSignatureHelpIs("ConstructorCall(str: string, num: number): ConstructorCall");
verify.currentParameterHelpArgumentNameIs("num");
verify.currentParameterSpanIs("num: number");
