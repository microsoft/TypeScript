/// <reference path='fourslash.ts'/>

////enum E {
////    /*1*/value1 = 1,
////    /*2*/"/*3*/value2" = /*4*/value1,
////    /*5*/111 = 11
////}
////
////E./*6*/value1;
////E["/*7*/value2"];
////E./*8*/value2;
////E[/*9*/111];

verify.baselineFindAllReferences('1', '2', '3', '4', '5', '6', '7', '8', '9');
