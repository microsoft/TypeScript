/// <reference path='fourslash.ts'/>

////interface I {
////    /*0*/property1: number;
////    property2: string;
////}
////
////function f({ /*1*/property1: p1 }: I,
////           { /*2*/property1 }: I,
////           { property1: p2 }) {
////
////    return /*3*/property1 + 1;
////}

verify.baselineFindAllReferences('0', '1', '2', '3')
