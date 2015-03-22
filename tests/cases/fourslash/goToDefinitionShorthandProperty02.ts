/// <reference path='fourslash.ts' />

////let x = {
////    f/*1*/oo
////}

goTo.marker("1");
verify.not.definitionLocationExists();