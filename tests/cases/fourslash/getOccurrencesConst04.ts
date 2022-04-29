/// <reference path='fourslash.ts' />

////export const class C {
////    private static c/*1*/onst f/*2*/oo;
////    constructor(public con/*3*/st foo) {
////    }
////}

goTo.marker("1");
verify.occurrencesAtPositionCount(1);
goTo.marker("2");
verify.occurrencesAtPositionCount(1);
goTo.marker("3");
verify.occurrencesAtPositionCount(1);