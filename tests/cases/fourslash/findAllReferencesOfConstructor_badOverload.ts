/// <reference path="fourslash.ts" />

////class C {
////    /*1*/constructor(n: number);
////    /*2*/constructor(){}
////}

verify.baselineFindAllReferences('1', '2');
