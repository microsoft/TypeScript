/// <reference path='fourslash.ts' />

/////*1*/enum /*2*/E { A }
////let e: /*3*/E.A;

verify.baselineFindAllReferences('1', '2', '3');
