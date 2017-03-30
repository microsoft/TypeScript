/// <reference path='fourslash.ts'/>

// @checkJs: true
// @allowJs: true

// @Filename: main.js
////function fnTest() { arguments; }
////fnTest(/*1*/);

goTo.marker('1');
verify.signatureHelpCountIs(1);
verify.currentSignatureParameterCountIs(1);
verify.currentSignatureHelpIs('fnTest(...args: any[]): void');
verify.currentParameterHelpArgumentNameIs('args');
verify.currentParameterSpanIs("...args: any[]");