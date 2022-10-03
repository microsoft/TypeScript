/// <reference path='fourslash.ts'/>

/////*1*/var /*2*/x = 0;
////
////with ({}) {
////    var y = x;  // Reference of x here should not be picked
////    y++;        // also reference for y should be ignored
////}
////
/////*3*/x = /*4*/x + 1;

verify.baselineFindAllReferences('1', '2', '3', '4');
