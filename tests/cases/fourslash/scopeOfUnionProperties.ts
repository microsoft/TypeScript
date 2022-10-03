/// <reference path='fourslash.ts'/>

////function f(s: string | number) {
////    s.constr/*1*/uctor
////}
goTo.marker("1")
verify.occurrencesAtPositionCount(1);
