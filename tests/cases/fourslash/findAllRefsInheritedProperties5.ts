/// <reference path='fourslash.ts'/>

//// class C extends D {
////     /*0*/prop0: string;
////     /*1*/prop1: number;
//// }
////
//// class D extends C {
////     /*2*/prop0: string;
//// }
////
//// var d: D;
//// d./*3*/prop0;
//// d./*4*/prop1;

verify.baselineFindAllReferences('0', '1', '2', '3', '4')
