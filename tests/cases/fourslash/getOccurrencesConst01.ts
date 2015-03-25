/// <reference path='fourslash.ts' />

/////*1*/const enum E1 {
////    v1,
////    v2
////}
////
/////*2*/const c = 0;

goTo.marker("1");
verify.occurrencesAtPositionCount(0);

goTo.marker("2");
verify.occurrencesAtPositionCount(0);
