/// <reference path='fourslash.ts' />
/////*1*/class /*2*/C {
////    n: number;
////    constructor() {
////        this.n = 12;
////    }
////}
////let c = new /*3*/C();

verify.baselineFindAllReferences('1', '2', '3');
