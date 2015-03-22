/// <reference path='fourslash.ts'/>

////class sampleCls { constructor(str: string, num: number) { } }
////var x = new sampleCls(/*1*/"", /*2*/5);

goTo.marker('1');
verify.signatureHelpCountIs(1);

verify.currentSignatureParameterCountIs(2);
verify.currentSignatureHelpIs('sampleCls(str: string, num: number): sampleCls');

verify.currentParameterHelpArgumentNameIs('str');
verify.currentParameterSpanIs("str: string");

goTo.marker('2');
verify.currentParameterHelpArgumentNameIs('num');
verify.currentParameterSpanIs("num: number");
