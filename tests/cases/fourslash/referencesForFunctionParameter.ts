/// <reference path='fourslash.ts'/>

////var x;
////var n;
////
////function n(x: number, /*1*/n: number) {
////    /*2*/n = 32;
////    x = /*3*/n;
////}

verify.baselineFindAllReferences('1', '2', '3');
