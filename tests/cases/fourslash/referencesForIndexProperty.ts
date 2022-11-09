/// <reference path='fourslash.ts'/>

// References a class property using string index access

////class Foo {
////    /*1*/property: number;
////    /*2*/method(): void { }
////}
////
////var f: Foo;
////f["/*3*/property"];
////f["/*4*/method"];

verify.baselineFindAllReferences('1', '2', '3', '4');
