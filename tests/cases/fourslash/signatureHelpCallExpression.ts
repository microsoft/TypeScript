/// <reference path='fourslash.ts'/>

////function fnTest(str: string, num: number) { }
////fnTest(/*1*/'', /*2*/5);

goTo.marker('1');
verify.signatureHelpCountIs(1);
verify.currentSignatureParameterCountIs(2);
verify.currentSignatureHelpIs('fnTest(str: string, num: number): void');

verify.currentParameterHelpArgumentNameIs('str');
verify.currentParameterSpanIs("str: string");

goTo.marker('2');
verify.currentParameterHelpArgumentNameIs('num');
verify.currentParameterSpanIs("num: number");
