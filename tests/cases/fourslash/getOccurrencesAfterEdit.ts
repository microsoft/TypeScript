/// <reference path='fourslash.ts'/>

/////*0*/
////function f(s: string) {
////    s.con/*1*/structor
////}

goTo.marker("1");
verify.occurrencesAtPositionCount(1);

goTo.marker("0");
edit.insert("\r\n");

goTo.marker("1");
verify.occurrencesAtPositionCount(1);