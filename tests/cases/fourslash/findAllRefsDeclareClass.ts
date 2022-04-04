/// <reference path="fourslash.ts" />

/////*1*/declare class /*2*/C {
////    static m(): void;
////}

verify.baselineFindAllReferences('1', '2');
