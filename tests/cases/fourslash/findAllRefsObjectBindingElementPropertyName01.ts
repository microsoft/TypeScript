/// <reference path='fourslash.ts'/>

////interface I {
////    /*1*/property1: number;
////    property2: string;
////}
////
////var foo: I;
/////*2*/var { /*3*/property1: prop1 } = foo;

verify.baselineFindAllReferences('1', '2', '3');
