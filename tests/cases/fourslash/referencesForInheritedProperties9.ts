/// <reference path='fourslash.ts'/>

//// class D extends C {
////     /*1*/prop1: string;
//// }
////
//// class C extends D {
////     /*2*/prop1: string;
//// }
////
//// var c: C;
//// c./*3*/prop1;

verify.baselineFindAllReferences('1', '2', '3');
