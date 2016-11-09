/// <reference path="fourslash.ts" />

//// declare function f(a: any, ...b: any[]): any;
//// f</*1*/>(1, 2);

goTo.marker("1");
verify.signatureHelpArgumentCountIs(0);
verify.signatureHelpCurrentArgumentListIsVariadic(false);