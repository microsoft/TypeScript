/// <reference path='fourslash.ts' />
/////*1*/interface /*2*/I {
////    p: number;
////}
////let i: /*3*/I = { p: 12 };

verify.baselineFindAllReferences('1', '2', '3');
