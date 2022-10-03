/// <reference path='fourslash.ts'/>

////interface I {
////    /*1*/property1: number;
////    property2: string;
////}
////
////var foo: I;
////var [ { property1: prop1 }, { /*2*/property1, property2 } ] = [foo, foo];

verify.baselineFindAllReferences('1', '2')
