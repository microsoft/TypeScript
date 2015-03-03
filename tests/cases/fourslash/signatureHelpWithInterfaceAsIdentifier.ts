/// <reference path='fourslash.ts'/>

////interface C {
////    (): void;
////}
////C(/*1*/);

goTo.marker('1');
verify.not.signatureHelpPresent();