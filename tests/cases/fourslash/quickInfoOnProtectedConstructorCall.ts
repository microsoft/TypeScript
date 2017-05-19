/// <reference path='fourslash.ts' />

////class A {
////    protected constructor() {}
////}
////var x = new A(/*1*/

goTo.marker("1");
verify.not.signatureHelpPresent();