/// <reference path='fourslash.ts'/>

////function /*1*/f(x: number): void;
////function /*2*/f(x: string): void;
////function /*3*/f(x: number | string) { }
////
////f(1);
////f("a");

verify.baselineFindAllReferences('1', '2', '3');
