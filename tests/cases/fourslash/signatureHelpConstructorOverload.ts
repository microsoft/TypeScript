/// <reference path='fourslash.ts'/>

////class clsOverload { constructor(); constructor(test: string); constructor(test?: string) { } }
////var x = new clsOverload(/*1*/);
////var y = new clsOverload(/*2*/'');

goTo.marker('1');
verify.signatureHelpCountIs(2);
verify.currentSignatureParameterCountIs(0);
verify.currentSignatureHelpIs('clsOverload(): clsOverload');

goTo.marker('2');
verify.currentSignatureParameterCountIs(1);
verify.currentSignatureHelpIs('clsOverload(test: string): clsOverload');
verify.currentParameterHelpArgumentNameIs('test');
verify.currentParameterSpanIs("test: string");