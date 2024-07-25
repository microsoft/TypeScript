/// <reference path='fourslash.ts'/>

////module M {
////    /*1*/export var /*2*/variable = 0;
////
////    // local use
////    var x = /*3*/variable;
////}
////
////// external use
////M./*4*/variable

verify.baselineFindAllReferences('1', '2', '3', '4');
