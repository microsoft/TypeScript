/// <reference path='fourslash.ts' />
/////*1*/enum /*2*/E {
////    First,
////    Second
////}
////let first = /*3*/E.First;

verify.baselineFindAllReferences('1', '2', '3');
