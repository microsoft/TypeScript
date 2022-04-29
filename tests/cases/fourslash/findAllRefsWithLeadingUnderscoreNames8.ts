/// <reference path='fourslash.ts' />

////(/*1*/function /*2*/__foo() {
////    /*3*/__foo();
////})

verify.baselineFindAllReferences('1', '2', '3');
