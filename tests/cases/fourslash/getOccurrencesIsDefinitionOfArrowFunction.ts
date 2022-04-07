/// <reference path='fourslash.ts' />
/////*1*/var /*2*/f = x => x + 1;
/////*3*/f(12);

verify.baselineFindAllReferences('1', '2', '3');
