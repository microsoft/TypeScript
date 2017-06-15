/// <reference path='fourslash.ts'/>

// @checkJs: true
// @allowJs: true

// @Filename: main.js
////function allOptional() { arguments; }
////allOptional(/*1*/);
////allOptional(1, 2, 3);
////function someOptional(x, y) { arguments; }
////someOptional(/*2*/);
////someOptional(1, 2, 3);
////someOptional(); // no error here; x and y are optional in JS

goTo.marker('1');
verify.signatureHelpCountIs(1);
verify.currentSignatureParameterCountIs(1);
verify.currentSignatureHelpIs('allOptional(...args: any[]): void');
verify.currentParameterHelpArgumentNameIs('args');
verify.currentParameterSpanIs("...args: any[]");

goTo.marker('2');
verify.signatureHelpCountIs(1);
verify.currentSignatureParameterCountIs(3);
verify.currentSignatureHelpIs('someOptional(x: any, y: any, ...args: any[]): void');
verify.currentParameterHelpArgumentNameIs('x');
verify.currentParameterSpanIs("x: any");
verify.numberOfErrorsInCurrentFile(0);
