/// <reference path='fourslash.ts' />

////interface I {
////    /*1*/0: number;
////    /*2*/s: string;
////}
////interface J {
////    a: I[/*3*/0],
////    b: I["/*4*/s"],
////}

verify.baselineFindAllReferences('1', '2', '3', '4');
