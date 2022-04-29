/// <reference path='fourslash.ts' />
/////*1*/type /*2*/Alias= number;
////let n: /*3*/Alias = 12;

verify.baselineFindAllReferences('1', '2', '3');
