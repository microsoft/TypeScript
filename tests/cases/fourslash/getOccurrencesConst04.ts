/// <reference path='fourslash.ts' />

////export const class C {
////    private static c/*1*/onst f/*2*/oo;
////    constructor(public con/*3*/st foo) {
////    }
////}

verify.baselineDocumentHighlights(["1", "2", "3"]);