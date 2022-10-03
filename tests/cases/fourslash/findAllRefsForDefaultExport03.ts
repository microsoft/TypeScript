/// <reference path='fourslash.ts'/>

/////*1*/function /*2*/f() {
////    return 100;
////}
////
/////*3*/export default /*4*/f;
////
////var x: typeof /*5*/f;
////
////var y = /*6*/f();
////
/////*7*/namespace /*8*/f {
////    var local = 100;
////}

verify.baselineFindAllReferences('1', '2', '3', '4', '5', '6', '7', '8');
