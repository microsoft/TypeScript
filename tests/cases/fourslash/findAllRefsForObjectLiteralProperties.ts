/// <reference path='fourslash.ts'/>

////var x = {
////    /*1*/property: {}
////};
////
////x./*2*/property;
////
/////*3*/let {/*4*/property: pVar} = x;

verify.baselineFindAllReferences('1', '2', '3', '4');
