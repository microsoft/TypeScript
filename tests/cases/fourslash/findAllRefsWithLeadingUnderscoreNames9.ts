/// <reference path='fourslash.ts' />

////(/*1*/function /*2*/___foo() {
////    /*3*/___foo();
////})

verify.baselineFindAllReferences('1', '2', '3');
