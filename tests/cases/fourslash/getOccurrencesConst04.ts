/// <reference path='fourslash.ts' />

////export const class C {
////    private static c/*1*/onst foo;
////    constructor(public con/*2*/st foo) {
////    }
////}

goTo.marker("1");
verify.occurrencesAtPositionCount(1);
goTo.marker("2");
verify.occurrencesAtPositionCount(0);