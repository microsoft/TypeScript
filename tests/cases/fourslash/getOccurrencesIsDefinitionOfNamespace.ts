/// <reference path='fourslash.ts' />
/////*1*/namespace /*2*/Numbers {
////    export var n = 12;
////}
////let x = /*3*/Numbers.n + 1;

verify.baselineFindAllReferences('1', '2', '3');
