/// <reference path='fourslash.ts'/>

////interface C {
////    (): void;
////}
////C(/*1*/);

verify.noSignatureHelp("1");
