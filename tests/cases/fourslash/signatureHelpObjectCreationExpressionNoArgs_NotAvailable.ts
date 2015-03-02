/// <reference path='fourslash.ts'/>

////class sampleCls { constructor(str: string, num: number) { } }
////var x = new sampleCls/**/;

goTo.marker();
verify.signatureHelpCountIs(0);
verify.not.signatureHelpPresent();