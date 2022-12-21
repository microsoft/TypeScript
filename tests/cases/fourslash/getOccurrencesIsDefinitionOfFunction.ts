/// <reference path='fourslash.ts' />
/////*1*/function /*2*/func(x: number) {
////}
/////*3*/func(x)

verify.baselineFindAllReferences('1', '2', '3');
